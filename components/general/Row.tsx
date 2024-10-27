import { defaultStyleValues, StyleProps } from '@/types/StyleProps';
import { Flex, Layout } from 'antd';

const { Content } = Layout;

const Row = ({
    children,
    styling =  defaultStyleValues
}: {
    children: any,
    styling?: StyleProps
}) => {
    return (
        <Content style={{
            display: "flex",
            flexDirection: "row",
            borderRadius: styling.borderRadius!,
            
            paddingTop: styling.paddingTop!,
            paddingBottom: styling.paddingBottom!,
            paddingLeft: styling.paddingLeft!,
            paddingRight: styling.paddingRight!,

            marginTop: styling.marginTop!,
            marginBottom: styling.marginBottom!,
            marginLeft: styling.marginLeft!,
            marginRight: styling.marginRight!,  
        }}>
            {children}
        </Content>
    )
}

export default Row;