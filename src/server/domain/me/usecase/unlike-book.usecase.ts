import { Book } from '@shared/types/book';
import { IMeRepository, ME_REPOSITORY_TOKEN } from './interface/me.repository.interface';
import Container, { Service } from 'typedi';

@Service()
export class UnlikeBookUsecase {
  private readonly meRepository: IMeRepository;

  constructor() {
    this.meRepository = Container.get(ME_REPOSITORY_TOKEN);
  }

  async execute(request: UnlikeBookRequest): Promise<void> {
    return this.meRepository.removeLikeBook(request.book);
  }
}

interface UnlikeBookRequest {
  book: Book;
}
