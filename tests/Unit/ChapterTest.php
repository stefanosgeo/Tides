<?php

namespace Tests\Unit;

use App\Models\Chapter;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChapterTest extends TestCase
{
    use RefreshDatabase;

    private Chapter $chapter;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub

        $this->chapter = Chapter::factory()->create();
    }

    /** @test */
    public function it_belongs_to_a_series(): void
    {
        $this->assertInstanceOf(BelongsTo::class, $this->chapter->series());
    }

    /** @test */
    public function it_has_many_clips(): void
    {
        $this->assertInstanceOf(HasMany::class, $this->chapter->clips());
    }
}