import { BaseController } from "../../Base/BaseController";
import { Chat } from "./chats.model";
import { ChatService } from "./chats.service";

export class ChatController extends BaseController<Chat> {
  protected service: ChatService;
  constructor() {
    super(new ChatService());
    this.service = new ChatService();
  }
  handleConnectionList = async (req: any, res: any) => {
    const page = Number(req.body.page) || 1;
    const limit = Number(req.body.limit) || 10;
    const userId = req?.body?.userId;

    const response = await this.service.getConnectionList(
      userId,
      page,
      limit,
    );

    res.status(200).json(response);
  };
}
