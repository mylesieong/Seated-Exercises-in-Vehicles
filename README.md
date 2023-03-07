# Seated Exercise in Vehicles

[![License](https://img.shields.io/github/license/mylesieong/Seated-Exercises-in-Vehicles)](https://github.com/mylesieong/Seated-Exercises-in-Vehicles/blob/main/LICENSE)

<a href='https://play.google.com/store/apps/details?id=com.unicornio.happyinseat&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
  <img alt='Get it on Google Play' height=80 src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/>
</a>

The android app `Seated Exercise in Vehicles` aims to help people exercise during their long distance trip, especially where they are refined in a small seat like on a bus or a train. 

## Charity purpose
This project was one of my little side projects being inspired by the idea of fitness everywhere. I did a bit of promotion and by the time of late 2022 it was published on play store and has 200+ installed users currently.

I decided to open source it under MIT license out of these good reasons:
1. I want to start giving back to the FOSS community
2. All the revenue generated from this app would be donated to **charity** (details would be shown)
3. A change to show case the MAD (modern android development) to folks who need them

## Install
1. Download the code to your local environment
2. Build and run with Android Studio or with gradle command
3. App will be available on your phone or emulator

## Architecture
* modules:
```
app (ui layer) ---> repository (data layer) ---> database (data layer)
   \                       \                        \     
    \-----------------------\----------------------- \---> model (core)
```
* Patterns:
  * MVVM (View Model)
  * Room
  * Jetpack Compose

## Make it your own
Feel free to folk and make your own version of app. Keep it in mind that you need to provide some local properties to keep the app running as expect for you. They are:
* Your gms app id in `local.properties` as `GMS_APPLICATION_ID`
* Your ad unit id in `local.properties` as `AD_UNIT_ID_INTERSTITIAL` and `AD_UNIT_ID_BANNER`
* Your `google-services.json` file under `app` folder

## Contribution
There would be public github projects serving for different purpose (e.g. User stories, Bug/Crash) where issues are categorized. You might comment in certain issue if you feel like to as well.