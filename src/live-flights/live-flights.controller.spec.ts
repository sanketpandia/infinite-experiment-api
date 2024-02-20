import { Test, TestingModule } from '@nestjs/testing';
import { LiveFlightsController } from './live-flights.controller';

describe('LiveFlightsController', () => {
  let controller: LiveFlightsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LiveFlightsController],
    }).compile();

    controller = module.get<LiveFlightsController>(LiveFlightsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
