import {
  Body,
  Get,
  HttpCode,
  JsonController,
  Params,
  Post,
  Put,
} from 'routing-controllers';
import { PostsService } from './posts.service';

@JsonController('/post', { transformResponse: false })
export class PostController {
  private postsService: PostsService;

  constructor() {
    this.postsService = new PostsService();
  }

  @HttpCode(201)
  @Post('/')
  add(@Body() body: any) {
    return this.postsService.add(body);
  }

  @Get('/')
  getFeedPosts() {
    return this.postsService.getFeedPosts();
  }

  @Get('/:id')
  getUserPosts(@Params() params: any) {
    return this.postsService.getUserPosts(params.userId);
  }

  @Put('/:id')
  likePost(@Params() params: any, @Body() body: any) {
    return this.postsService.likePost(params.id, body.userId);
  }
}
