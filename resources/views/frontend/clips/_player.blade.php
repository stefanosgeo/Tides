<div class="flex flex-col">

    <div class="flex justify-center content-center pt-6 " >
            <video id="player" controls data-poster="{{'/'.$clip->assets->first()->path }}" controls data-plyr-config='{ "title": "Example Title" }'s>
                <source src="{{ '/'.$clip->assets->first()->path  }}" type="video/mp4" />
                <!-- Captions are optional -->
                <track kind="captions" label="English captions" src="/path/to/captions.vtt" srclang="en" default />
            </video>
    </div>

    <div class="flex justify-around pt-8 pb-3 border-b-2 border-gray-500">

        <div class="flex items-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z">
                </path>
            </svg>
            <span class="pl-3"></span> {{ gmdate("H:i:s", $clip->assets()->first()->duration) }} Min
        </div>

        <div class="flex items-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                </path>
            </svg>
            <span class="pl-3">{{ $clip->created_at }}</span>
        </div>

        <div class="flex items-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12">

                </path>
            </svg>
            <span class="pl-3"> {{ $clip->assets->first()->updated_at }}</span>
        </div>

        <div class="flex items-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                </path>
            </svg>
            <span class="pl-3"> 0 Views </span>
        </div>

    </div>

</div>