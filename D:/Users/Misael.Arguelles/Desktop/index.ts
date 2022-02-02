import DalAuth from '../../DataAccess/dalAuth';
import AuthInteractors from './AuthInteractors';

const authRepository = new DalAuth();
const authInteractors = new  AuthInteractors(authRepository);

export default authInteractors;



