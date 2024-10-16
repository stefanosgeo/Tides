<?php

namespace App\Jobs;

use App\Services\WowzaService;
use DOMException;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CreateWowzaSmilFile implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(private Model $model)
    {
        //
    }

    /**
     * Create a wowza smil file based on clip assets
     *
     *
     * @throws DOMException
     */
    public function handle(WowzaService $wowzaService): void
    {
        $wowzaService->createSmilFile($this->model);
    }
}
