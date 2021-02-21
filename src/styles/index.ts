import styled from 'styled-components/native';

export const MainContainer = styled.View`
  flex: 1;
  background: #e8237d;
`;

interface PrimaryText {
  textColor?: string;
  fontSize?: number;
  alignSelf?: string;
}
export const PrimaryText = styled.Text<PrimaryText>`
  font-size: ${(props: PrimaryText) =>
    props.fontSize ? props.fontSize : 16}px;
  color: ${(props: PrimaryText) =>
    props.textColor ? props.textColor : '#ffffff'};
  align-self: ${(props: PrimaryText) =>
    props.alignSelf ? props.alignSelf : 'center'};
  font-family: 'Poppins-Regular';
`;

interface SecondaryText {
  textColor?: string;
  alignSelf?: string;
  fontSize?: number;
  light?: boolean;
}
export const SecondaryText = styled.Text<SecondaryText>`
  font-size: ${(props: SecondaryText) =>
    props.fontSize ? props.fontSize : 14}px;
  font-family: ${(props: SecondaryText) =>
    props.light ? 'Poppins-Light' : 'Poppins-Bold'};
  color: ${(props: SecondaryText) =>
    props.textColor ? props.textColor : '#ffffff'};
  align-self: ${(props: SecondaryText) =>
    props.alignSelf ? props.alignSelf : 'center'};
`;
