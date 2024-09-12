#!/bin/bash
REPO_NAME="test_hiing_webview"
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGION="ap-northeast-2"
NEW_PORT=0
OLD_PORT=0
echo "Step 1: AWS ECR 로그인"
aws ecr get-login-password --region ${REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com
echo "Step 2: 최신 이미지 태그 가져오기"
IMAGE_TAGS=$(aws ecr describe-images --repository-name ${REPO_NAME} --query "imageDetails[*].imageTags[]" --output text | grep -Eo "[0-9]{8}_[0-9]+")
LATEST_TAG=$(echo "$IMAGE_TAGS" | sort -r | head -n 1)
echo "Step 3: 현재 실행 중인 컨테이너의 포트 확인 및 새 포트 결정"
if docker ps | grep -q ":9093->8090"; then
    NEW_PORT=9094
    OLD_PORT=9093
elif docker ps | grep -q ":9094->8090"; then
    NEW_PORT=9093
    OLD_PORT=9094
else
    NEW_PORT=9093
    OLD_PORT=9094
fi
echo "Step 4: REPO_NAME에 해당하는 컨테이너 중 현재 및 이전 버전을 제외하고 모두 삭제"
docker container ls -a --format "{{.Names}}" | grep "^${REPO_NAME}_" | grep -vE "${REPO_NAME}_(${OLD_PORT})$" | xargs -r docker container stop | xargs -r docker container rm
echo "Step 5: 새 이미지 pull 및 실행"
docker pull ${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${REPO_NAME}:${LATEST_TAG}
docker run -d -p ${NEW_PORT}:80 --name ${REPO_NAME}_${NEW_PORT} ${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${REPO_NAME}:${LATEST_TAG}
echo "Step 6: 새 컨테이너 실행 확인"
if [ $(docker ps -q --filter "name=${REPO_NAME}_${NEW_PORT}") ]; then
    echo "새 컨테이너 ${REPO_NAME}_${NEW_PORT}가 성공적으로 시작되었습니다."
    # Nginx 설정 변경 및 리로드
    NGINX_CONFIG_FILE=/etc/nginx/nginx.conf # Nginx 설정 파일 경로 확인 필요
    CURRENT_PROXY_PASS=$(grep "proxy_pass http://backend_" $NGINX_CONFIG_FILE)
    EXPECTED_PROXY_PASS="proxy_pass http://backend_${NEW_PORT};"
    if [ "$CURRENT_PROXY_PASS" != "$EXPECTED_PROXY_PASS" ]; then
        echo "Step 7: Nginx 설정 변경 및 리로드"
        sudo sed -i "/listen 8090;/,/}/s|proxy_pass http://backend_[0-9]\+;|proxy_pass http://backend_${NEW_PORT};|" $NGINX_CONFIG_FILE
        sudo nginx -t && sudo systemctl reload nginx
    else
        echo "No change needed in Nginx configuration."
    fi
    echo "Step 8: 이전 버전 컨테이너 중지"
    if [ $(docker ps -q --filter "name=${REPO_NAME}_${OLD_PORT}") ]; then
        echo "이전 컨테이너 ${REPO_NAME}_${OLD_PORT}를 중지합니다."
        docker stop ${REPO_NAME}_${OLD_PORT}
    fi
else
    echo "새 컨테이너 시작에 실패했습니다."
    exit 1
fi
echo "Step 9: 사용하지 않는 이미지 정리"
used_images=$(docker ps --format "{{.Image}}")
all_images=$(docker images --format "{{.Repository}}:{{.Tag}}" | grep "^${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${REPO_NAME}:")
for image in $all_images; do
    if ! echo "$used_images" | grep -q "$image"; then
        echo "Deleting unused image: $image"
        docker rmi "$image"
    fi
done
echo "Script execution completed successfully."