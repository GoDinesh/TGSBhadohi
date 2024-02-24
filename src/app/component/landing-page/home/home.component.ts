import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
//import { OwlOptions } from 'ngx-owl-carousel-o';
// import 'src/assets/website/js/main.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  dynamicSlides = [
    {
      id: 1,
      src:'/assets/website/img/activity/1.jpg',
      alt:'Side 1',
      title:'Side 1'
    },
    {
      id: 2,
      src:'/assets/website/img/activity/2.png',
      alt:'Side 2',
      title:'Side 2'
    },
    {
      id: 3,
      src:'/assets/website/img/activity/3.jpg',
      alt:'Side 3',
      title:'Side 3'
    },{
      id: 4,
      src:'/assets/website/img/activity/4.jpg',
      alt:'Side 4',
      title:'Side 4'
    },{
      id: 5,
      src:'/assets/website/img/activity/5.jpg',
      alt:'Side 5',
      title:'Side 5'
    },{
      id: 6,
      src:'/assets/website/img/activity/6.jpg',
      alt:'Side 6',
      title:'Side 6'
    },{
      id: 7,
      src:'/assets/website/img/activity/7.png',
      alt:'Side 7',
      title:'Side 7'
    },{
      id: 8,
      src:'/assets/website/img/activity/8.jpg',
      alt:'Side 8',
      title:'Side 8'
    },{
      id: 9,
      src:'/assets/website/img/activity/9.jpg',
      alt:'Side 9',
      title:'Side 9'
    },{
      id: 10,
      src:'/assets/website/img/activity/10.jpg',
      alt:'Side 10',
      title:'Side 10'
    },{
      id: 11,
      src:'/assets/website/img/activity/11.jpg',
      alt:'Side 11',
      title:'Side 11'
    },{
      id: 12,
      src:'/assets/website/img/activity/12.jpeg',
      alt:'Side 12',
      title:'Side 12'
    },
    {
      id: 13,
      src:'/assets/website/img/activity/13.jpg',
      alt:'Side 13',
      title:'Side 13'
    },
    {
      id: 14,
      src:'/assets/website/img/activity/14.jpg',
      alt:'Side 14',
      title:'Side 14'
    },
    {
      id: 15,
      src:'/assets/website/img/activity/15.jpg',
      alt:'Side 15',
      title:'Side 15'
    },
    {
      id: 16,
      src:'/assets/website/img/activity/16.jpg',
      alt:'Side 16',
      title:'Side 16'
    },
    {
      id: 17,
      src:'/assets/website/img/activity/17.jpg',
      alt:'Side 17',
      title:'Side 17'
    },
    {
      id: 18,
      src:'/assets/website/img/activity/18.jpg',
      alt:'Side 18',
      title:'Side 18'
    },
  ]

  Slides = [
    {
      id: 1,
      src:'/assets/website/img/carousel-1.jpg',
      alt:'Side 1',
      title:'Side 1'
    },
    {
      id: 2,
      src:'/assets/website/img/carousel-2.png',
      alt:'Side 2',
      title:'Side 2'
    },
  ]


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 200,
    autoplay: true,
    autoHeight: true,
    autoWidth: true,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      // 760: {
      //   items: 3
      // },
      // 1000: {
      //   items: 4
      // }
    },
    nav: true
  }
}
