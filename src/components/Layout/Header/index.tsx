import React from 'react';

import * as S from './styled';

type HeaderProps = {
    title: string;
    location: Location;
};

const Header: React.FC<HeaderProps> = ({ title, location }) => {
    const { pathname } = location;

    return (
        <S.Wrapper>
            <S.Header>
                <div>
                    <div className='pc-only'>
                        <S.MenuLink href='/' isselected='false'>
                            {title}
                        </S.MenuLink>
                    </div>
                    <div className='mobile-only mobile-logo'>
                        <S.MenuLink href='/' isselected='false'>
                            D
                        </S.MenuLink>
                    </div>
                </div>
                <S.Menu>
                    <S.MenuLink href='/posts' isselected={pathname.includes('/posts').toString()}>
                        posts
                    </S.MenuLink>
                    <S.MenuLink href='/about' isselected={(pathname === '/about').toString()}>
                        about
                    </S.MenuLink>
                    <S.MenuLink href='/guestbook' isselected={(pathname === '/guestbook').toString()}>
                        guestbook
                    </S.MenuLink>
                    <S.MenuLink href='/playground' isselected={(pathname === '/playground').toString()}>
                        playground
                    </S.MenuLink>
                </S.Menu>
            </S.Header>
        </S.Wrapper>
    );
};

export default Header;
