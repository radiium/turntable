import { EditPlaylistModule } from './edit-playlist.module';

describe('EditPlaylistModule', () => {
  let editPlaylistModule: EditPlaylistModule;

  beforeEach(() => {
    editPlaylistModule = new EditPlaylistModule();
  });

  it('should create an instance', () => {
    expect(editPlaylistModule).toBeTruthy();
  });
});
