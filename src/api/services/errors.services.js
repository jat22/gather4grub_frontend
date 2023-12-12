import { Navigate } from "react-router-dom"

const navigate = Navigate();

const handleServerError = (res) => {
	if(res.status === 500){
		
	} else return
};

const errorMap = {
	500 : 'Something went wrong, please try again.',
	401 : navigate('/unauthorized')
};


const responseMape = {
	200 : 'ok',
	201 : 'created',
	304 : 'not modified',
	400 : 'bad request',
	401 : 'unauthoroized',
	405 : 'method not allowed',
	500 : 'internal server error'

}