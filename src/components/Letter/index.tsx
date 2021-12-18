import React from 'react';
import { Container } from '@style/common/modal';
import { css } from '@emotion/react';

const Letter = () => {
    return (
        <Container>
            안녕하세요! 로요일 좋아 개발자입니다. <br />
            <br />
            마이로아(https://myloa.kro.kr/) 에서 로요일좋아(https://loa-day.com/) 으로 도메인을 이전했습니다!
            <br /> 이전 사이트는 이번 년도에 삭제할 예정입니다. 이전된 도메인으로 정상적으로 운영 될 예정이니 많은 이용
            부탁드립니다. <br />
            기존 마이로아 사용자 분들은 마이로아에 접속하셔서 관리 메뉴 &gt; 데이터 백업코드 생성하셔서 로아데이로
            가져오시면 됩니다.
            <br />
            <br />
            12/17 로아온에서 게임 내 숙제 관리 시스템이 도입된다고 하여, 숙제 관리 메뉴는 삭제 할 예정입니다. 다른
            컨텐츠 제공으로 도움이 되도록 하겠습니다! <br />
            <br />
            현재는 데이터가 브라우저 단위 저장이지만, 사이트가 성장함에 따라 서버에 데이터를 저장하도록 변경 할
            예정입니다.
            <br />
            <br /> 취미로 만들어 본 사이트라 아직 부족한 점이 많습니다.
            <br /> 많은 관심 부탁드리며 버그 제보와 요청 사항은 감사히 받겠습니당 💜
            <a target="_blank" href="https://discord.gg/an2dykC9">
                디스코드 바로가기 🐇
            </a>
            <a target="_blank" href="https://loa-day.com/">
                로요일좋아 바로가기 🐇
            </a>
            <span
                css={css`
                    text-align: right;
                `}
            >
                개발자 올림
            </span>
        </Container>
    );
};

export default Letter;
