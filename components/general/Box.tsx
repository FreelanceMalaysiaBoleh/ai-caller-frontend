import { defaultStyleValues, StyleProps } from '@/types/StyleProps';
import { Flex, Layout } from 'antd';

const { Content } = Layout;


const Box = ({
    children,
    styling = defaultStyleValues
}: {
    children: any,
    styling?: StyleProps
}) => {

    let contentWidth = `${styling.grid! * 8.3333}%`

    console.log(contentWidth);

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