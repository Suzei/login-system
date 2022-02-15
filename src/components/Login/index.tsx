import { Col, Input, Row, message } from "antd"
import Form from "antd/lib/form/Form"
import FormItem from "antd/lib/form/FormItem"
import Password from "antd/lib/input/Password"
import { Button } from "antd"
import { useAuth } from "../../context/AuthProvider/useAuth"
import { unstable_HistoryRouter } from "react-router-dom"

export const Login = () => {
const auth = useAuth()
const history = unstable_HistoryRouter
async function onFinish(values: {email: string, password: string}) {
    try {
        await auth.authenticate(values.email, values.password)
        history.push("/profile")
    } catch (error) {
        message.error('Invalid e-mail or password')
    }
}

    return (
        <Row
        justify="center"
        align="middle"
        style={{
            height: '100vh'
        }}>
            <Col span={12}>
              <Form
              name="form"
              labelCol={{span:8}}
              wrapperCol={{span: 16}}
              onFinish={onFinish}>
                <FormItem
                label="Email"
                name="Email">
                <Input/>
                    
                </FormItem>

                <FormItem
                label="Password"
                name="password">
                <Password/>

                </FormItem>

                <FormItem wrapperCol={{offset: 8, span: 15}}>
                    <Button type="primary" htmlType="submit">
                    Login
                    </Button>
                </FormItem>
                </Form>  
            </Col>

        </Row>
    )
}