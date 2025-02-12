import { Test, TestingModule } from '@nestjs/testing';
import { VideoSdkService } from './video-sdk.service';

describe('VideoSdkService', () => {
  let service: VideoSdkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoSdkService],
    }).compile();

    service = module.get<VideoSdkService>(VideoSdkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
