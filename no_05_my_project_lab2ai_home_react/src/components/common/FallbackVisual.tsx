import { StyledVisualFallback } from "@/styled/common/CommonStyled"

const fallbackVisual = () => {
  return (
    <StyledVisualFallback>
      <img src="https://kr.object.ncloudstorage.com/cosign/lab2ai/visual-fallback.png" alt="로딩이미지" />
    </StyledVisualFallback>
  )
}

export default fallbackVisual