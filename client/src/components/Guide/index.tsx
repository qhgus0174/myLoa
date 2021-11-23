import React from 'react';
import { FormContainer, FormDivContainer } from '@style/common/modal';
import styled from '@emotion/styled';

const Guide = () => {
    return (
        <FormContainer>
            <FormDivContainer>
                <GuideUl>
                    <LiContainter>
                        <span>🔹 데이터</span>
                        <UlContainer>
                            <li>
                                - 브라우저 단위로 저장됩니다. (데이터를 백업하여 다른 브라우저로 가져가더라도 동기화
                                되지 않습니다.)
                            </li>
                        </UlContainer>
                    </LiContainter>
                    <LiContainter>
                        <span>🔹 캐릭터</span>
                        <UlContainer>
                            <li>- 로스트아크 서버 점검 시간에는 캐릭터 정보를 불러올 수 없습니다.</li>
                            <li>( ❕ 점검이 끝난 후 캐릭터 수정 화면에서 갱신 버튼을 눌러주세요. )</li>
                        </UlContainer>
                    </LiContainter>
                    <LiContainter>
                        <span>🔹 숙제</span>
                        <UlContainer>
                            <li>- 체크박스, 텍스트 형식 선택 가능</li>
                            <li>- 카오스 던전 / 가디언 토벌 : 최대 2번 체크 가능</li>
                            <li>- 체크박스 체크 시 휴식게이지는 바로 소모됩니다.</li>
                            <li> - 에포나 의뢰 : 최대 3번 체크 가능, 개별 이름 설정 가능 </li>
                            <span>
                                🕕<b> 초기화</b>
                            </span>
                            <UlContainer>
                                <li>- 일일, 주간 선택 시 특정 시간에 자동으로 초기화 됩니다.</li>
                                <li> - 체크박스 모두 해제(컨텐츠 항목에서 [초기화 X] 선택 시 예외)</li>
                                <li> - 휴식게이지 자동 계산(대상 : 카오스 던전, 가디언 토벌) </li>
                                <li>- 일일 : 매일 오전 6시 </li>
                                <li>- 주간 : 매주 수요일 오전 6시</li>
                            </UlContainer>
                        </UlContainer>
                    </LiContainter>
                    <LiContainter>
                        <span>🔹 데이터 수정</span>
                        <UlContainer>
                            <li>- 각 항목 위에 마우스 오른쪽 클릭</li>
                            <li>- 캐릭터 : 오른쪽 위 갱신 버튼을 클릭하여 레벨을 갱신 </li>
                            <li>- 숙제(개별) : 메모 및 휴식게이지, 숨김 여부 설정</li>
                            <li>- 숙제 앞 원은 행 고정 여부 입니다. (붉은색 : 고정)</li>
                        </UlContainer>
                    </LiContainter>
                </GuideUl>
            </FormDivContainer>
        </FormContainer>
    );
};

const GuideUl = styled.ul`
    line-height: 1.7;
    font-size: 1.1rem;
`;

const LiContainter = styled.li`
    margin-bottom: 0.7em;

    span {
        font-weight: 500;
        font-size: 1.12rem;
    }
`;

const UlContainer = styled.ul`
    padding-left: 1.2em;
`;

export default Guide;
