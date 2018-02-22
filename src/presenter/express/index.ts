import { Router, Request, Response} from 'express';
import Config from './Config';
import enhancedRouter from './enhancedRouter';
import {register, login, forgetPassword,resetPassword} from './auth';
import {getPosts, createPost, getPostById, updatePost, deletePostById} from './posts';
import {getUserById, getUsers, updateUser, createUser, deleteUserById} from './users';
import {createComment, getCommentById, getComments, updateComment, deleteCommentById} from './comments';
import {createRole, getRoleById, getRoles, updateRole, deleteRoleById, assignRolePermission, revokeRolePermission} from './roles';
import {createPermission, getPermissionById, getPermissions} from './permissions';

export default (config: Config): Router => {
  const router: Router = enhancedRouter(config);

  router.get('/', (req: Request, res: Response) => {
    res.status(200)
       .json({message: "This is where the awesomeness happen..."});
  });

  router.post('/auth/register', register(config));
  router.post('/auth/login', login(config));
  router.post('/auth/forget-password', forgetPassword(config));
  router.post('/auth/reset-password', resetPassword(config));

  router.post('/users', createUser(config));
  router.delete('/users/:user_id', deleteUserById(config));
  router.get('/users/:user_id', getUserById(config));
  router.get('/users', getUsers(config));
  router.patch('/users/:user_id', updateUser(config));
  
  router.get('/posts', getPosts(config));
  router.get('/posts/:post_id', getPostById(config));
  router.delete('/posts/:post_id', deletePostById(config));
  router.post('/posts', createPost(config));
  router.patch('/posts/:post_id', updatePost(config));

  router.get('/comments', getComments(config));
  router.post('/comments', createComment(config));
  router.get('/comments/:comment_id', getCommentById(config));
  router.patch('/comments/:comment_id', updateComment(config));
  router.delete('/comments/:comment_id', deleteCommentById(config));

  router.get('/roles', getRoles(config));
  router.post('/roles', createRole(config));
  router.get('/roles/:role_id', getRoleById(config));
  router.patch('/roles/:role_id', updateRole(config));
  router.delete('/roles/:role_id', deleteRoleById(config));
  router.post('/roles/:role_id/permissions', assignRolePermission(config));
  router.delete('/roles/:role_id/permissions/:permission_id', revokeRolePermission(config));

  router.get('/permissions', getPermissions(config));
  router.post('/permissions', createPermission(config));
  router.get('/permissions/:permission_id', getPermissionById(config));

  return router;
}