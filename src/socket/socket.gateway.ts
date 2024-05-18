import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { Body } from '@nestjs/common';
import {
  ButtonSelectDto,
  PageRefreshDto,
  PlayerLeftOrJoinDto,
  ShareAudioEffectDto,
  ShareEmojiDto,
  UserInputDto,
  WinnerDto,
} from './dto/userInput.dto';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Socket;

  constructor(private readonly socketService: SocketService) {}

  handleConnection(socket: Socket): void {
    this.socketService.handleConnection(socket);
  }

  @SubscribeMessage('connectRoom')
  // connectRoom(@Body() joinRoomDto: JoinRoomDto) {
  connectRoom(client: Socket, name: string) {
    const split = name.split('-');
    const code: string = split[0];
    const player: string = split[1];
    client.join(code);
    this.server.emit('connectRoom', player);
  }

  @SubscribeMessage('userInput')
  handleEvent(@Body() userInput: UserInputDto) {
    this.server.in(userInput.code).emit('userInput', { message: userInput });
  }

  @SubscribeMessage('winnerMsg')
  handleWinner(@Body() user: WinnerDto) {
    console.log(user);
    this.server.in(user.code).emit('winnerMsg', { message: user.username });
  }

  @SubscribeMessage('restartMsg')
  handleRestart(@Body() user: WinnerDto) {
    this.server.in(user.code).emit('restartMsg', user.username);
  }

  @SubscribeMessage('selectBtnTypeMsg')
  handleButtonSelect(@Body() btnType: ButtonSelectDto) {
    this.server
      .in(btnType.code)
      .emit('selectBtnTypeMsg', { message: btnType?.type });
  }

  @SubscribeMessage('shareEmojiMsg')
  shareEmoji(@Body() emojiDto: ShareEmojiDto) {
    this.server
      .in(emojiDto.code)
      .emit('shareEmojiMsg', { message: emojiDto?.emoji });
  }

  @SubscribeMessage('playerJoin')
  handlePlayerJoin(dto: PlayerLeftOrJoinDto) {
    this.server.in(dto.code).emit('playerJoin', dto.name);
  }

  @SubscribeMessage('playerLeft')
  handlePlayerLeft(@Body() dto: PlayerLeftOrJoinDto) {
    this.server.in(dto.code).emit('playerLeft', dto.name);
  }

  @SubscribeMessage('audioEffects')
  handleAudioEffects(@Body() audioType: ShareAudioEffectDto) {
    this.server.in(audioType.code).emit('audioEffects', audioType.name);
  }

  @SubscribeMessage('pageRefresh')
  handlePageRefresh(@Body() refreshDto: PageRefreshDto) {
    console.log(refreshDto);
    this.server.in(refreshDto.code).emit('pageRefresh', refreshDto.name);
  }
}
