import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export const withRouterAndRedux = (Component) => {
    const Wrapper = (props) => {
        const navigate = useNavigate();
        const params = useParams();
        const dispatch = useDispatch();
        const state = useSelector(state => state);

        return (
            <Component
                navigate={navigate}
                params={params}
                dispatch={dispatch}
                state={state}
                {...props}
            />
        );
    };

    return Wrapper;
};