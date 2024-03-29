import { Controller, Get, Query, Res } from '@nestjs/common';
import { WechatService } from './wechat.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('微信相关')
@Controller('wechat')
export class WechatController {
  constructor(private readonly wechatService: WechatService) {}

  @Get('/wechatVerify')
  @ApiOperation({
    summary: '微信小程序测试',
  })
  async wechatVerify(@Query() query: any, @Res() res: Response) {
    console.log(query);
    const { signature, timestamp, nonce, echostr } = query;
    const checkSignature = this.wechatService.checkSignature(
      signature,
      timestamp,
      nonce,
    );
    if (checkSignature) {
      res.send(echostr);
    } else {
      res.send('Invalid signature');
    }
  }

  @Get('/openID')
  @ApiOperation({
    summary: '通过code获取openId',
  })
  async openid(@Query('code') code: string) {
    const openId = await this.wechatService.getOpenId(code);
    return openId;
  }

  @Get('/pushWeatherMsgByOpenId')
  @ApiOperation({
    summary: '自定义OpenId推送天气信息',
  })
  async pushSomeWeatherMsg(@Query('openId') openId: string) {
    return await this.wechatService.pushSomeWeatherMsg(openId);
  }

  @Get('/pushWeatherMsg')
  @ApiOperation({
    summary: '推送天气信息',
  })
  async pushWeatherMsg() {
    return await this.wechatService.pushWeatherMsg();
  }

  @Get('/wechatTestVerify')
  @ApiOperation({
    summary: '微信测试公众号',
  })
  async wechatTestVerify(@Query() query: any, @Res() res: Response) {
    console.log(query);
    const { signature, timestamp, nonce, echostr } = query;
    const checkSignature = this.wechatService.checkSignature(
      signature,
      timestamp,
      nonce,
    );
    if (checkSignature) {
      res.send(echostr);
    } else {
      res.send('Invalid signature');
    }
  }

  @Get('/pushWechatTestMsg')
  @ApiOperation({
    summary: '推送测试公众号消息',
  })
  async pushWechatTestMsg() {
    return await this.wechatService.pushWechatTestMsg();
  }
}
