import { MaterialInstance, MaterialService } from './../shared/classes/material.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { AnalyticsService } from '../shared/services/analytics.service';
import { OverviewPage } from './../shared/interfaces';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tapTarget') tapTargetRef!: ElementRef;
  tapTarget!: MaterialInstance;

  data$!: Observable<OverviewPage>;
  yesyerdayDate = '';

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.data$ = this.analyticsService.getOverview();
    this.yesyerdayDate = moment().add(-1, 'd').format('DD.MM.YYYY');
  }

  ngOnDestroy(): void {
    this.tapTarget.destroy?.();
  }

  ngAfterViewInit(): void {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef);
  }

  openInfo() {
    this.tapTarget.open?.();
  }

}
