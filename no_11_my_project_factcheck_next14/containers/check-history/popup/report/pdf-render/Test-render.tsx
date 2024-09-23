import React from 'react'
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

const TestRender = () => {

    // 폰트 등록
    Font.register({
        family: 'SpoqaHanSans',      // 폰트 이름 설정
        src: 'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf',
    });
    
    // 스타일 정의
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4',
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
        },
        text: {
            fontFamily: 'SpoqaHanSans', // 한글 폰트 적용
            fontSize: 12,
        },
    });
    
    
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.text}>안녕하세요, PDF 문서입니다!</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>한글이 정상적으로 출력됩니다.</Text>
                </View>
            </Page>
        </Document>
    )
}

export default TestRender;
