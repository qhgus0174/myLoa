import React from 'react';
import styled from '@emotion/styled';
import { Container, ContentContainer } from '@style/common/modal';

const Guide = () => {
    return (
        <Container>
            <ContentContainer>
                <ul>
                    <LiContainter>
                        <span>πΉ λ°μ΄ν°</span>
                        <UlContainer>
                            <li>
                                - λΈλΌμ°μ  λ¨μλ‘ μ μ₯λ©λλ€. (λ°μ΄ν°λ₯Ό λ°±μνμ¬ λ€λ₯Έ λΈλΌμ°μ λ‘ κ°μ Έκ°λλΌλ λκΈ°ν
                                λμ§ μμ΅λλ€.)
                            </li>
                        </UlContainer>
                    </LiContainter>
                    <LiContainter>
                        <span>πΉ μΊλ¦­ν°</span>
                        <UlContainer>
                            <li>- λ‘μ€νΈμν¬ μλ² μ κ² μκ°μλ μΊλ¦­ν° μ λ³΄λ₯Ό λΆλ¬μ¬ μ μμ΅λλ€.</li>
                            <li>( β μ κ²μ΄ λλ ν μΊλ¦­ν° μμ  νλ©΄μμ κ°±μ  λ²νΌμ λλ¬μ£ΌμΈμ. )</li>
                        </UlContainer>
                    </LiContainter>
                    <LiContainter>
                        <span>πΉ μμ </span>
                        <UlContainer>
                            <li>- μ²΄ν¬λ°μ€, νμ€νΈ νμ μ ν κ°λ₯</li>
                            <li>- μΉ΄μ€μ€ λμ  / κ°λμΈ ν λ² : μ΅λ 2λ² μ²΄ν¬ κ°λ₯</li>
                            <li>- μ²΄ν¬λ°μ€ μ²΄ν¬ μ ν΄μκ²μ΄μ§λ λ°λ‘ μλͺ¨λ©λλ€.</li>
                            <li> - μν¬λ μλ’° : μ΅λ 3λ² μ²΄ν¬ κ°λ₯, κ°λ³ μ΄λ¦ μ€μ  κ°λ₯ </li>
                            <span>
                                π<b> μ΄κΈ°ν</b>
                            </span>
                            <UlContainer>
                                <li>- μΌμΌ, μ£Όκ° μ ν μ νΉμ  μκ°μ μλμΌλ‘ μ΄κΈ°ν λ©λλ€.</li>
                                <li> - μ²΄ν¬λ°μ€ λͺ¨λ ν΄μ (μ»¨νμΈ  ν­λͺ©μμ [μ΄κΈ°ν X] μ ν μ μμΈ)</li>
                                <li> - ν΄μκ²μ΄μ§ μλ κ³μ°(λμ : μΉ΄μ€μ€ λμ , κ°λμΈ ν λ²) </li>
                                <li>- μΌμΌ : λ§€μΌ μ€μ  6μ </li>
                                <li>- μ£Όκ° : λ§€μ£Ό μμμΌ μ€μ  6μ</li>
                            </UlContainer>
                        </UlContainer>
                    </LiContainter>
                    <LiContainter>
                        <span>πΉ λ°μ΄ν° μμ </span>
                        <UlContainer>
                            <li>- κ° ν­λͺ© μμ λ§μ°μ€ μ€λ₯Έμͺ½ ν΄λ¦­</li>
                            <li>- μΊλ¦­ν° : μ€λ₯Έμͺ½ μ κ°±μ  λ²νΌμ ν΄λ¦­νμ¬ λ λ²¨μ κ°±μ  </li>
                            <li>- μμ (κ°λ³) : λ©λͺ¨ λ° ν΄μκ²μ΄μ§, μ¨κΉ μ¬λΆ μ€μ </li>
                            <li>- μμ  μ μμ ν κ³ μ  μ¬λΆ μλλ€. (λΆμμ : κ³ μ )</li>
                        </UlContainer>
                    </LiContainter>
                    <LiContainter>
                        <span>πΉ κ³¨λ μμ</span>
                        <UlContainer>
                            <li>- μμ  νμ΄μ§μμ μ΅μ΄ νλμ μΊλ¦­ν°λ₯Ό λΆλ¬μμΌ κ³¨λ μμμ μμ±νμ€ μ μμ΅λλ€.</li>
                        </UlContainer>
                    </LiContainter>
                </ul>
            </ContentContainer>
        </Container>
    );
};

const LiContainter = styled.li`
    margin-bottom: 0.8em;
    line-height: 1.921;
    span {
        font-weight: 500;
        font-size: 1.12rem;
    }
`;

const UlContainer = styled.ul`
    padding-left: 1.2em;
    li {
        font-size: 1.02rem;
    }
`;

export default Guide;
