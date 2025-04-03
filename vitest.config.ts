/// <reference types="vitest" /> 
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,            // 전역 변수(jest의 expect 등)를 사용 가능하게 함
        environment: 'jsdom',     // 브라우저 환경을 흉내내기 위해 jsdom 사용
        setupFiles: './vitest.setup.ts',  // 테스트 전 설정 파일 (필요 시)
    },
});
