import { Button, Row, Typography } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { LoginOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { resetUser, selectUser, TUser } from '../store/user';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
    location: 'login' | 'contacts';
}

export default function AppHeader({location}: Props) {
    const {user} = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOut = ()=>{
        dispatch(resetUser());
        navigate('/login');
    };
    return (
    <Header>
        <Row justify="space-between" align='middle' >
            <Typography.Title level={2} style={{color:'white',marginBottom:0, lineHeight:'inherit'}}>{location === 'contacts' ? 'Контакты':'Авторизация'}</Typography.Title>
            {!!user ? (
                <Button icon={<LoginOutlined />} type="link" onClick={logOut}>
                    Выход
                </Button>
            ):(
                <Link to="/login">
                    <Button icon={<LoginOutlined />} type="link">
                        Логин
                    </Button>
                </Link>        
            )}
        </Row>
    </Header>
)
}