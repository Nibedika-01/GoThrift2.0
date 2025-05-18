import React from 'react'
import secure from '../../assets/Images/secure_icon.png'

const FeatureLandingPage = () => {
  return (
    <>
    <section id="features" class="container mx-auto px-4 space-y-6 bg-[#f5f2eb] min-h-screen py-8 md:py-12 lg:py-20">

  <div class="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">

    <h2 class="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl text-rose-700">
      Features
    </h2>

    <p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 text-rose-700">
      Cute features made just for you to sparkle every day.
    </p>

  </div>

    <div class="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">

        <div
            class="relative overflow-hidden rounded-lg border bg-rose-50 select-none hover:shadow hover:shadow-teal-200 p-2">
            <div class="flex h-[180px] flex-col justify-between rounded-md p-6">
                <svg viewBox="0 0 24 24" class="h-12 w-12 fill-current">
                    <img src="" alt="" />
                </svg>
                <div class="space-y-2">
                    <h3 class="font-bold text-rose-700">Affordable</h3>
                    <p class="text-sm text-muted-foreground">Look good, save money, and support sustainable fashion!</p>
                </div>
            </div>
        </div>

        <div
            class="relative overflow-hidden rounded-lg border bg-rose-50 select-none hover:shadow hover:shadow-teal-200 p-2">
            <div class="flex h-[180px] flex-col justify-between rounded-md p-6">
                <svg viewBox="0 0 24 24" class="h-12 w-12 fill-current">
                    
                </svg>
                <div class="space-y-2">
                    <h3 class="font-bold text-rose-700">Shopping Cart</h3>
                    <p class="text-sm">Girlies can add their products and review them in cart section.</p>
                </div>
            </div>
        </div>

        <div
            class="relative overflow-hidden rounded-lg border bg-rose-50 select-none hover:shadow hover:shadow-teal-200 p-2">
            <div class="flex h-[180px] flex-col justify-between rounded-md p-6">
                <svg viewBox="0 0 24 24" class="h-12 w-12 fill-current">
                   <img src={secure} alt="" />
                </svg>
                <div class="space-y-2">
                    <h3 class="font-bold text-rose-700">User Authentication</h3>
                    <p class="text-sm text-muted-foreground">Signup and Login</p>
                </div>
            </div>
        </div>

        <div
            class="relative overflow-hidden rounded-lg border bg-rose-50 select-none hover:shadow hover:shadow-teal-200 p-2">
            <div class="flex h-[180px] flex-col justify-between rounded-md p-6">
                <svg viewBox="0 0 24 24" class="h-12 w-12 fill-current">
                    
                </svg>
                <div class="space-y-2">
                    <h3 class="font-bold text-rose-700">Mobile Friendly Design</h3>
                    <p class="text-sm text-muted-foreground">Responsive UI for seamless use on phone and tablets.</p>
                </div>
            </div>
        </div>

        <div
            class="relative overflow-hidden rounded-lg border bg-rose-50 select-none hover:shadow hover:shadow-teal-200 p-2">
            <div class="flex h-[180px] flex-col justify-between rounded-md p-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"
                    class="h-12 w-12 fill-current">
                   
                </svg>
                <div class="space-y-2">
                    <h3 class="font-bold text-rose-700">Authentication</h3>
                    <p class="text-sm text-muted-foreground">Authentication using NextAuth.js and middlewares.</p>
                </div>
            </div>
        </div>

        <div
            class="relative overflow-hidden rounded-lg border bg-rose-50 select-none hover:shadow hover:shadow-teal-200 p-2">
            <div class="flex h-[180px] flex-col justify-between rounded-md p-6">
                <svg viewBox="0 0 24 24" class="h-12 w-12 fill-current">
                    
                </svg>
                <div class="space-y-2">
                    <h3 class="font-bold text-rose-700">Subscriptions</h3>
                    <p class="text-sm text-muted-foreground">Free and paid subscriptions using Stripe.</p>
                </div>
            </div>
        </div>

    </div>

</section>
    </>
  )
}

export default FeatureLandingPage
