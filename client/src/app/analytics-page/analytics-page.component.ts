import { AnalyticsPage } from './../shared/interfaces';
import { ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { Subscription } from 'rxjs';
import { CategoryScale, Chart, LineController, LineElement, LinearScale, PointElement, Title } from 'chart.js';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
  
  @ViewChild('gain') gainRef!: ElementRef;
  @ViewChild('order') orderRef!: ElementRef;
  
  average!: number;
  pending: boolean = true;
  oSub!: Subscription;

  constructor(private service: AnalyticsService) { }

  ngAfterViewInit(): void {
    const gainConfig: any = {
      label: 'Gain',
      color: 'rgb(255, 99, 132)',
    }

    const orderConfig: any = {
      label: 'Order',
      color: 'rgb(54, 162, 235)',
    }

    this.oSub = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average;

      gainConfig.labels = data.chart.map(el => el.label);
      gainConfig.data = data.chart.map(el => el.gain);

      orderConfig.labels = data.chart.map(el => el.label);
      orderConfig.data = data.chart.map(el => el.order);

      const gainContext = this.gainRef.nativeElement.getContext('2d');
      gainContext.canvas.height = '300px'

      const orderContext = this.orderRef.nativeElement.getContext('2d');
      orderContext.canvas.height = '300px'

      Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
    
      new Chart(gainContext, createChartConfig(gainConfig) as any);
     
      new Chart(orderContext, createChartConfig(orderConfig) as any);

      this.pending = false;
    })
  }

  ngOnDestroy(): void {
    if (this.oSub) {
      this.oSub.unsubscribe();
    }
  }

}


function createChartConfig(config: any) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels: config.labels,
      datasets: [
        {
          label: config.label,
          data: config.data,
          borderColor: config.color,
          steppedLine: false,
          fill: false,
        }
      ]
    }
  }
}
