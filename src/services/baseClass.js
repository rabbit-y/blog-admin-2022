export class ArticleCountVOObject {
  /** total */
  total = undefined;

  /** typeId */
  typeId = '';

  /** typeName */
  typeName = '';
}

export class ArticleVOObject {
  /** content */
  content = '';

  /** createTime */
  createTime = '';

  /** description */
  description = '';

  /** id */
  id = undefined;

  /** title */
  title = '';

  /** typeId */
  typeId = '';

  /** typeName */
  typeName = '';
}

export class ElogObject {
  /** id */
  id = undefined;

  /** info */
  info = '';
}

export class IPage {
  /** current */
  current = undefined;

  /** pages */
  pages = undefined;

  /** records */
  records = [];

  /** size */
  size = undefined;

  /** total */
  total = undefined;
}

export class JsonResult {
  /** code */
  code = undefined;

  /** data */
  data = new ArticleVOObject();

  /** msg */
  msg = '';
}

export class ModelAndView {
  /** empty */
  empty = false;

  /** model */
  model = undefined;

  /** modelMap */
  modelMap = undefined;

  /** reference */
  reference = false;

  /** status */
  status = 'ACCEPTED';

  /** view */
  view = new View();

  /** viewName */
  viewName = '';
}

export class MoodObject {
  /** content */
  content = '';

  /** createTime */
  createTime = '';

  /** id */
  id = undefined;
}

export class TheArticleObject {
  /** content */
  content = '';

  /** createTime */
  createTime = '';

  /** description */
  description = '';

  /** id */
  id = undefined;

  /** title */
  title = '';

  /** typeId */
  typeId = '';
}

export class TheCommentObject {
  /** 评论人头像 */
  avatar = '';

  /** 评论人博客地址 */
  blogUrl = '';

  /** content */
  content = '';

  /** createTime */
  createTime = '';

  /** 评论人邮箱 */
  email = '';

  /** id */
  id = undefined;

  /** 评论人昵称 */
  nickName = '';

  /** replyArticleId */
  replyArticleId = undefined;

  /** 回复评论的id */
  replyCmId = undefined;
}

export class TheTypeObject {
  /** description */
  description = '';

  /** id */
  id = undefined;

  /** name */
  name = '';
}

export class TheUserObject {
  /** articleCounts */
  articleCounts = [];

  /** avatar */
  avatar = '';

  /** blog */
  blog = '';

  /** email */
  email = '';

  /** id */
  id = undefined;

  /** nickname */
  nickname = '';

  /** other */
  other = '';

  /** pwd */
  pwd = '';

  /** role */
  role = '';
}

export class TheUserObject0 {
  /** avatar */
  avatar = '';

  /** blog */
  blog = '';

  /** email */
  email = '';

  /** id */
  id = undefined;

  /** nickname */
  nickname = '';

  /** other */
  other = '';

  /** pwd */
  pwd = '';

  /** role */
  role = '';
}

export class TheUserObject1 {
  /** avatar */
  avatar = '';

  /** blog */
  blog = '';

  /** email */
  email = '';

  /** id */
  id = undefined;

  /** nickname */
  nickname = '';

  /** other */
  other = '';

  /** pwd */
  pwd = '';

  /** role */
  role = '';
}

export class View {
  /** contentType */
  contentType = '';
}
