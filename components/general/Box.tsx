import { defaultStyleValues, StyleProps } from '@/types/StyleProps';
import { Layout } from 'antd';

const { Content } = Layout;


const Box = ({
    children,
    styling = defaultStyleValues
}: {
    children: JSX.Element,
    styling?: StyleProps
}) => {

    return (
        <Content style={{
            backgroundColor: styling.backgroundColor!,
            borderRadius: styling.borderRadius!,
            
            paddingTop: styling.paddingTop!,
            paddingBottom: styling.paddingBottom!,
            paddingLeft: styling.paddingLeft!,
            paddingRight: styling.paddingRight!,

            marginTop: styling.marginTop!,
            marginBottom: styling.marginBottom!,
            marginLeft: styling.marginLeft!,
            marginRight: styling.marginRight!,
            
            maxWidth: styling.width!
        }}>
            {children}
        </Content>
    )
}

export default Box;