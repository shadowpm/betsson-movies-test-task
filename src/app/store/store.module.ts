import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import SearchEffects from './search/effects';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './index';
import DetailEffects from './detail/effects';

@NgModule({
  imports: [StoreModule.forRoot(rootReducer, {}), EffectsModule.forRoot([SearchEffects, DetailEffects])],
  exports: [StoreModule, EffectsModule],
  declarations: [],
  providers: [],
})
class StoreMainModule {}

export default StoreMainModule;
