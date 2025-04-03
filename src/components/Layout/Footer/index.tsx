import React from 'react';

import * as S from './styled';

const Footer: React.FC = () => {
    const test = '';
    return (
        <S.Wrapper>
            <S.Footer>
                © Powered by <S.Link href=''>Frankie</S.Link>
            </S.Footer>
        </S.Wrapper>
    );
};

export default Footer;
