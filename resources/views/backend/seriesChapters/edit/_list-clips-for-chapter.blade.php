<div class="flex mt-6  pb-1 font-medium border-b border-black font-3xl dark:text-white dark:border-white">
    {{ __('chapter.backend.clips for this chapter') }}
</div>
<form action="{{ route('series.chapters.removeClips',[$series, $chapter]) }}"
      method="POST"
>
    @method('PATCH')
    @csrf
    @forelse($chapter->clips as $clip)
        <div class="flex-row dark:text-white">
            <div class="py-4">
                <div class="flex align-content-center align-middle items-center">
                    <x-checkbox multiple
                                name="ids[]"
                                value="{{$clip->id}}"
                    />
                    <label class="pl-2 inline-block text-gray-800 dark:text-white"
                           for="{{ $clip->id }}"
                    >
                        {{ $clip->episode.' - '.$clip->title.' / '.$clip->recording_date}}
                    </label>
                </div>
            </div>
            @empty
                <p class="flex-row py-4">
                    {{ 'No clips found for chapter '.$chapter->title }}
                </p>
            @endforelse
            <div class="pt-8">
                <x-button class="bg-blue-600 hover:bg-blue-700"
                          type="submit"
                >
                    {{ __('chapter.backend.actions.remove selected clips from chapter') }}
                </x-button>
            </div>
        </div>
</form>
