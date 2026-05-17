import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError, tap, of } from 'rxjs';
import { AllStatsResponse, StatisticsApiResponse } from '../interfaces/dashboard.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://flower.elevateegy.com/api/v1';

  // State management using Signals
  readonly statistics = signal<AllStatsResponse | null>(null);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  loadAllStatistics(): Observable<AllStatsResponse> {
    this.loading.set(true);
    this.error.set(null);

    const mockData = {
      "message": "success",
      "statistics": {
          "overall": {
              "totalProducts": 28,
              "totalOrders": 105,
              "totalCategories": 10,
              "totalRevenue": 88841.05
          },
          "products": {
              "productsByCategory": [
                  {
                      "_id": "69d988714461df0f939b57cf",
                      "count": 6,
                      "category": "gifts",
                      "products": [
                          {
                              "title": "White Lily Dream",
                              "price": 250,
                              "imgCover": "f88744c4-72c1-43a7-ae19-3598bb2db50e-beautiful-bouquet-red-roses-flowers-wrapped-ribbon-arrangement_53876-1164925.jpg",
                              "quantity": 32
                          },
                          {
                              "title": "Lavender Bloom Basket",
                              "price": 500,
                              "imgCover": "b6e72357-61b2-492b-9a99-fb42246676bf-elegant-bouquet-red-pink-white-roses-with-green-foliage_9975-132510.jpg",
                              "quantity": 40
                          },
                          {
                              "title": "Daisy Fresh Touch",
                              "price": 400,
                              "imgCover": "300cd875-dae2-4d81-bc1d-cbe654e9faca-woman-is-holding-festive-bouquet-with-chrysathemum-flowers-her-hands_169016-15347.jpg",
                              "quantity": 53
                          },
                          {
                              "title": "Garden Rose Mix",
                              "price": 150,
                              "imgCover": "a70a30c1-3637-4920-9dab-dd36c7601d76-bouquet-flowers-dark-wooden-background-bouquet-with-roses_73240-226.jpg",
                              "quantity": 40
                          },
                          {
                              "title": "Tropical Flower Paradise",
                              "price": 200,
                              "imgCover": "5795e2b6-6a48-47eb-9da1-3a801e38ea61-mixed-flower-composition-side-vieq_140725-9166.jpg",
                              "quantity": 100
                          },
                          {
                              "title": "Luxury Floral Box",
                              "price": 500,
                              "imgCover": "4bc4ba8f-f101-4df2-8fa7-d6ebbc5bdefa-front-view-girl-holds-beautiful-bouquet-colorful-roses-tulips-peonies-paper-wrapper_140725-11418.jpg",
                              "quantity": 70
                          }
                      ]
                  },
                  {
                      "_id": "69d988704461df0f939b57cc",
                      "count": 16,
                      "category": "flowers",
                      "products": [
                          {
                              "title": "Wdding Flower",
                              "price": 300,
                              "imgCover": "fefa790a-f0c1-42a0-8699-34e8fc065812-cover_image.png",
                              "quantity": 98,
                              "sold": 37
                          },
                          {
                              "title": "Red Wdding Flower",
                              "price": 500,
                              "imgCover": "5452abf4-2040-43d7-bb3d-3ae8f53c4576-cover_image.png",
                              "quantity": 50,
                              "sold": 41
                          },
                          {
                              "title": "25 Red Roses | Black Wrap",
                              "price": 1999,
                              "imgCover": "44da12d8-4017-4e97-b654-ae76b5c8af48-cover_image.png",
                              "quantity": 4997,
                              "sold": 3
                          },
                          {
                              "title": "Emotional Moments Bouquet | 25 Chrysanthemum",
                              "price": 1099,
                              "imgCover": "7a2f7d11-fd7d-4f85-9cb7-5e6cabd475bc-cover_image.png",
                              "quantity": 4997,
                              "sold": 3
                          },
                          {
                              "title": "Sunshine Daisies",
                              "price": 1899,
                              "imgCover": "8e2cb03e-bab1-458a-96a8-123b00e36c6e-cover_image.png",
                              "quantity": 4998,
                              "sold": 2
                          },
                          {
                              "title": "Red Rose Bouquet",
                              "price": 200,
                              "imgCover": "6c9d91cf-c8d3-4b0d-8fa6-8bfa61f0c257-basket-with-bright-red-roses-eucalyptus-chair-flower-shop-beautiful-bouquet-flowers-holiday_427589-51.jpg",
                              "quantity": 12
                          },
                          {
                              "title": "Pink Tulip Garden",
                              "price": 400,
                              "imgCover": "97eb6c0d-5f5a-45e2-ae59-bd0629b9399f-bouquet-delicate-pink-roses_191095-85880.jpg",
                              "quantity": 40
                          },
                          {
                              "title": "Sunflower Sunshine",
                              "price": 200,
                              "imgCover": "9369712d-4dc5-4ce0-a646-e7a20c239ca7-bouquet-roses-with-ribbon-tied-around-bottom_915071-156715.jpg",
                              "quantity": 20
                          },
                          {
                              "title": "Royal Orchid Mix",
                              "price": 400,
                              "imgCover": "a0164686-cc5e-4024-bf38-b1a98bf1c734-romantic-bouquet-pink-roses_191095-83984.jpg",
                              "quantity": 12
                          },
                          {
                              "title": "Spring Blossom Collection",
                              "price": 600,
                              "imgCover": "765580b9-d491-43d3-bc61-d6f66e8d99e7-woman-holding-bouquet-pink-red-roses-anthurium-peony-flowers_140725-10856.jpg",
                              "quantity": 15
                          },
                          {
                              "title": "Golden Tulip Bouquet",
                              "price": 300,
                              "imgCover": "031594e9-bef5-4149-842d-a2a07f0e2e14-promoting-boue-paper-bouquet-red-roses-hanged-from-wall_114579-2584.jpg",
                              "quantity": 45
                          },
                          {
                              "title": "Elegant White Roses",
                              "price": 400,
                              "imgCover": "49dbf3d7-078b-4fbe-b4cf-d5063e519e83-side-view-bouquet-red-color-spray-roses-flowers-with-pink-pink-chrysanthemum-jpg_140725-12106.jpg",
                              "quantity": 40
                          },
                          {
                              "title": "Blooming Love Basket",
                              "price": 400,
                              "imgCover": "9bacedfd-f579-4d1b-9bd6-893b4db88510-green-rose-flower-filter-beauty_1203-3943.jpg",
                              "quantity": 40
                          },
                          {
                              "title": "Charming Carnation Bouquet",
                              "price": 350,
                              "imgCover": "56823696-412a-4656-85e4-e5e9b42c2611-psd-beautiful-bouquet-flowers-transparent-png_1014454-1164.jpg",
                              "quantity": 70
                          },
                          {
                              "title": "Violet Bloom Arrangement",
                              "price": 400,
                              "imgCover": "a3feb7ce-f73f-4d7f-9cce-a29afea06d42-grey-paper-bouquet-white-roses-standing-black-wooden-chair_114579-1853.jpg",
                              "quantity": 10
                          },
                          {
                              "title": "Elegant Violet Roses",
                              "price": 500,
                              "imgCover": "04533ea3-4cf7-4f6a-a9f0-15e335482efb-close-up-delicate-woman-hands-holding-bunch-flowers_158595-94.jpg",
                              "quantity": 32
                          }
                      ]
                  },
                  {
                      "_id": "69d988724461df0f939b57de",
                      "count": 3,
                      "category": "chocolate",
                      "products": [
                          {
                              "title": "Moko Chocolate Set | Esperance Rose",
                              "price": 1200,
                              "imgCover": "aa6c2099-17db-4e81-85eb-2314cdaf31e8-cover_image.png",
                              "quantity": 995,
                              "sold": 5
                          },
                          {
                              "title": "Patchi Chocolate 500g | Lilies Vase",
                              "price": 1900,
                              "imgCover": "31ec8c75-a82b-42ff-81ce-44c1b0c9d42e-cover_image.png",
                              "quantity": 1200,
                              "sold": 0
                          },
                          {
                              "title": "Shan Shal Turquoise Chocolate Box | Red Roses",
                              "price": 4200,
                              "imgCover": "11b17f45-a01e-47fe-8484-c58efb6f38d1-cover_image.png",
                              "quantity": 396,
                              "sold": 4
                          }
                      ]
                  },
                  {
                      "_id": "69d988724461df0f939b57e7",
                      "count": 1,
                      "category": "Candles & Diffusers",
                      "products": [
                          {
                              "title": "Romantic Rose Box",
                              "price": 500,
                              "imgCover": "7a234bea-87bf-4262-b872-c205fb1a74eb-luxurious-festive-bouquet-red-fresh-roses-studio-photo_115919-3928.jpg",
                              "quantity": 5
                          }
                      ]
                  },
                  {
                      "_id": "69d988714461df0f939b57d2",
                      "count": 1,
                      "category": "cards",
                      "products": [
                          {
                              "title": "Fresh Jasmine Touch",
                              "price": 400,
                              "imgCover": "c5393146-71e7-4225-8eee-a5f72f458dde-showing-purple-bouquet-roses-floss-flowers-street-view_114579-1922.jpg",
                              "quantity": 40
                          }
                      ]
                  },
                  {
                      "_id": "69d988724461df0f939b57e1",
                      "count": 1,
                      "category": "Cakes",
                      "products": [
                          {
                              "title": "Pink Rose Fantasy",
                              "price": 400,
                              "imgCover": "5a65448f-4048-45ad-9c94-c64dbaa79c97-high-angle-shot-tag-beautiful-heart-shaped-bouquet-pink-roses_181624-33619.jpg",
                              "quantity": 11
                          }
                      ]
                  }
              ],
              "topSellingProducts": [
                  {
                      "_id": "69d988754461df0f939b581a",
                      "title": "Red Wdding Flower",
                      "imgCover": "https://flower.elevateegy.com/uploads/5452abf4-2040-43d7-bb3d-3ae8f53c4576-cover_image.png",
                      "price": 500,
                      "sold": 41,
                      "id": "69d988754461df0f939b581a"
                  },
                  {
                      "_id": "69d988754461df0f939b5817",
                      "title": "Wdding Flower",
                      "imgCover": "https://flower.elevateegy.com/uploads/fefa790a-f0c1-42a0-8699-34e8fc065812-cover_image.png",
                      "price": 300,
                      "sold": 37,
                      "id": "69d988754461df0f939b5817"
                  },
                  {
                      "_id": "69d988764461df0f939b5826",
                      "title": "Moko Chocolate Set | Esperance Rose",
                      "imgCover": "https://flower.elevateegy.com/uploads/aa6c2099-17db-4e81-85eb-2314cdaf31e8-cover_image.png",
                      "price": 1200,
                      "sold": 5,
                      "id": "69d988764461df0f939b5826"
                  },
                  {
                      "_id": "69d988774461df0f939b582f",
                      "title": "Shan Shal Turquoise Chocolate Box | Red Roses",
                      "imgCover": "https://flower.elevateegy.com/uploads/11b17f45-a01e-47fe-8484-c58efb6f38d1-cover_image.png",
                      "price": 4200,
                      "sold": 4,
                      "id": "69d988774461df0f939b582f"
                  },
                  {
                      "_id": "69d988774461df0f939b5838",
                      "title": "25 Red Roses | Black Wrap",
                      "imgCover": "https://flower.elevateegy.com/uploads/44da12d8-4017-4e97-b654-ae76b5c8af48-cover_image.png",
                      "price": 1999,
                      "sold": 3,
                      "id": "69d988774461df0f939b5838"
                  }
              ],
              "lowStockProducts": [
                  {
                      "_id": "6a062ebd6bbaf1588bbe5812",
                      "title": "Romantic Rose Box",
                      "imgCover": "https://flower.elevateegy.com/uploads/7a234bea-87bf-4262-b872-c205fb1a74eb-luxurious-festive-bouquet-red-fresh-roses-studio-photo_115919-3928.jpg",
                      "price": 500,
                      "quantity": 5,
                      "id": "6a062ebd6bbaf1588bbe5812"
                  }
              ]
          },
          "orders": {
              "ordersByStatus": [
                  {
                      "_id": "inProgress",
                      "count": 22
                  },
                  {
                      "_id": "completed",
                      "count": 2
                  },
                  {
                      "_id": "pending",
                      "count": 81
                  }
              ],
              "dailyRevenue": [
                  {
                      "_id": "2026-05-15",
                      "revenue": 0,
                      "count": 1
                  },
                  {
                      "_id": "2026-05-13",
                      "revenue": 120,
                      "count": 1
                  },
                  {
                      "_id": "2026-05-11",
                      "revenue": 15367.2,
                      "count": 4
                  },
                  {
                      "_id": "2026-05-09",
                      "revenue": 100,
                      "count": 1
                  },
                  {
                      "_id": "2026-05-04",
                      "revenue": 3127.5,
                      "count": 2
                  },
                  {
                      "_id": "2026-05-03",
                      "revenue": 2697.6,
                      "count": 2
                  },
                  {
                      "_id": "2026-04-30",
                      "revenue": 919.5999999999999,
                      "count": 1
                  }
              ],
              "monthlyRevenue": [
                  {
                      "_id": "2026-05",
                      "revenue": 21412.3,
                      "count": 11
                  },
                  {
                      "_id": "2026-04",
                      "revenue": 67428.75,
                      "count": 94
                  }
              ]
          },
          "categories": [
              {
                  "_id": "69d988704461df0f939b57cc",
                  "name": "flowers",
                  "totalProducts": 16,
                  "totalRevenue": 9947
              },
              {
                  "_id": "69d988714461df0f939b57cf",
                  "name": "gifts",
                  "totalProducts": 6,
                  "totalRevenue": 2000
              },
              {
                  "_id": "69d988714461df0f939b57d2",
                  "name": "cards",
                  "totalProducts": 1,
                  "totalRevenue": 400
              },
              {
                  "_id": "69d988714461df0f939b57d5",
                  "name": "Jewellery",
                  "totalProducts": 0,
                  "totalRevenue": 0
              },
              {
                  "_id": "69d988714461df0f939b57d8",
                  "name": "perfumes",
                  "totalProducts": 0,
                  "totalRevenue": 0
              },
              {
                  "_id": "69d988724461df0f939b57db",
                  "name": "watches",
                  "totalProducts": 0,
                  "totalRevenue": 0
              },
              {
                  "_id": "69d988724461df0f939b57de",
                  "name": "chocolate",
                  "totalProducts": 3,
                  "totalRevenue": 7300
              },
              {
                  "_id": "69d988724461df0f939b57e1",
                  "name": "Cakes",
                  "totalProducts": 1,
                  "totalRevenue": 400
              },
              {
                  "_id": "69d988724461df0f939b57e4",
                  "name": "Plants",
                  "totalProducts": 0,
                  "totalRevenue": 0
              },
              {
                  "_id": "69d988724461df0f939b57e7",
                  "name": "Candles & Diffusers",
                  "totalProducts": 1,
                  "totalRevenue": 500
              }
          ]
      }
    };

    return of(mockData.statistics as unknown as AllStatsResponse).pipe(
      tap((data) => {
        this.statistics.set(data);
        this.loading.set(false);
      })
    );
  }
}
