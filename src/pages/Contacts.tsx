import { Button, Typography, Modal, Tooltip, Row, Col, Form, Input } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import { Link, Navigate } from "react-router-dom"
import { LoginOutlined, PlusCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { useAppDispatch } from "../hooks/hooks";
import contacts, { deleteContact, editContact, selectContacts, TContact } from "../store/contacts";
import { useSelector } from "react-redux";
import AppHeader from "../common/Header";
import { selectUser } from "../store/user";

export const Contacts = ()=>{
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentId, setCurrentId] = useState<string|undefined>(undefined);
    const [searchString, setSearchString] = useState('');
    const [form] = useForm();
    const dispatch = useAppDispatch();
    const contacts = useSelector(selectContacts(searchString));
    const {user} = useSelector(selectUser);

    const showModal = () => {
      setIsModalVisible(true);
    };  
    
    const findContactById = (id:string|undefined)=>contacts.find(contact => contact.id === id);

    const onOk = () => {
        form.validateFields()
        .then((values:TContact) => {
            dispatch(editContact(values))
            setIsModalVisible(false);
            form.resetFields();
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });        
    }

    const onCancel = () => {
        setIsModalVisible(false);
    }

    const onDeleteClick = (id:string) => {
        dispatch(deleteContact(id));
    }

    const onEditClick = (id?:string|undefined) => {
        setCurrentId(id);
        showModal();
    }

    useEffect(()=>{
        if (form){
            form.resetFields();
        }
    },[currentId,form]);

    return (
        <>
            {!user && <Navigate to="/login" />}
            <Layout>
                <AppHeader location="contacts" />
                <Content style={{padding:8}}>
                    <Row justify="center">
                        <Col span={2}>
                            Поиск
                        </Col>
                        <Col span={10}>
                            <Input value={searchString} onChange={(event)=>setSearchString(event.currentTarget.value)} allowClear />
                        </Col>
                    </Row>
                    {contacts.length > 0 ? contacts.map( contact => (
                        <Row key={contact.id} gutter={[8,16]} style={{paddingTop:16}}>
                            <Col span={10}>{contact.name}</Col>
                            <Col span={10}>{contact.phone}</Col>
                            <Col span={2}>
                                <Button shape="circle" icon={<DeleteOutlined/>} onClick={()=>onDeleteClick(contact.id)}></Button>
                            </Col>
                            <Col span={2}>
                                <Button shape="circle" icon={<EditOutlined/>} onClick={()=>onEditClick(contact.id)}></Button>
                            </Col>
                        </Row>
                    )): (
                        <Row>
                            {`Контактов ${searchString ? `содержащих строку '${searchString}'`:''} пока нет...`}
                        </Row>
                    )}
                    <Row justify="end" style={{paddingTop:16}}>
                        <Button title="Добавить контакт" shape="round" type="primary" icon={<PlusCircleOutlined />} onClick={()=>onEditClick()}>Добавить контакт</Button>
                    </Row>
                </Content>
                <Modal title={`${currentId ? 'Редактирование':'Добавление'} контакта`} visible={isModalVisible} onOk={onOk} onCancel={onCancel} forceRender keyboard>
                    <Form layout="vertical" form={form}>
                        <Form.Item name='id' initialValue={currentId} hidden>
                            <Input value={currentId} />
                        </Form.Item>
                        <Form.Item name="name" label="Имя" initialValue={findContactById(currentId)?.name} rules={[{required:true,message:'Please input the Name!'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="phone" label="Телефон" initialValue={findContactById(currentId)?.phone} rules={[{required:true,message:'Please input the Phone!'}]}>
                            <Input/>
                        </Form.Item>
                    </Form>
                </Modal>
            </Layout>
        </>
    );    
};