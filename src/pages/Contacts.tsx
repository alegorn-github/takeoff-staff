import { Button, Typography, Modal, Tooltip } from "antd";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import { Link } from "react-router-dom"
// import styled from "styled-components";
import { LoginOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useState } from "react";

// const StyledLayout = styled(Layout)`
//     margin:0 auto;
//     padding: 0 20px;
//     max-width: 1700px;
//     background-color: white;

// `;

// const StyledHeader = styled(Header)`
//     display: flex;
//     justify-content: flex-end;
//     align-items: center;
//     padding: 10px;
// `;

export const Contacts = ()=>{
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentId, setCurrentId] = useState<number|undefined>(undefined);

    const showModal = () => {
      setIsModalVisible(true);
    };    

    const onOk = () => {
        console.log('OK');
        setIsModalVisible(false);
    }

    const onCancel = () => {
        setIsModalVisible(false);
    }

    return (
        <>
            <Layout>
                <Header>
                    <Link to="/login">
                        <Button icon={<LoginOutlined />} type="link">
                            Логин
                        </Button>
                    </Link>        
                </Header>
                <Content>
                    <Tooltip title="Tooltip" visible={true} >
                        <Typography.Title level={2}>Контакты</Typography.Title>
                    </Tooltip>
                    <Button title="Добавить контакт" type="primary" icon={<PlusCircleOutlined />} onClick={showModal}>Добавить контакт</Button>
                </Content>
                <Modal title={`${currentId ? 'Редактирование':'Добавление'} контакта`} visible={isModalVisible} onOk={onOk} onCancel={onCancel}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </Layout>
        </>
    );    
};