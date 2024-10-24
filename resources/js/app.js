import 'boot';

import {
  Livewire,
  Alpine,
} from '../../vendor/livewire/livewire/dist/livewire.esm';
import jQuery from 'jquery';
import Pikaday from 'pikaday';
import * as FilePond from 'filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginMediaPreview from 'filepond-plugin-media-preview';
import 'filepond/dist/filepond.min.css';
import select2 from 'select2';
import { VidstackPlayer, VidstackPlayerLayout } from 'vidstack/global/player';
import 'vidstack/player/styles/base.css';
import {
  generateGeolocationLineChart,
  generatePieChart,
  generateBarChart,
  generateClipViewsLineChart,
} from './chartsSetup.js';

window.jQuery = window.$ = jQuery;
window.Pikaday = Pikaday;
window.select2 = select2();

//import Livewire after the above .js libraries
Livewire.start();

$('.solution-trix-field-wrapper')
  .find($('trix-editor'))
  .css('min-height', '100px');

document.addEventListener('alpine:init', () => {
  Alpine.store('darkMode', {
    on: Alpine.$persist(true).as('darkMode_on'),

    toggle() {
      this.on = !this.on;
    },
  });
});

document.addEventListener(
  'DOMContentLoaded',
  function () {
    $('.select2-tides').select2();

    $('.select2-tides-clips').select2({
      allowClear: true,
      placeholder: 'Search for a clip',
      tags: true,
      minimumInputLength: 2,
      ajax: {
        url: '/api/clips/',
        delay: 250,
        data: function (params) {
          return {
            query: params.term, // search term
            page: params.page,
          };
        },
        processResults: function (data, params) {
          params.page = params.page || 1;
          return {
            results: $.map(data, function (obj) {
              return { id: obj.id, text: obj.name };
            }),
            pagination: {
              more: params.page * 30 < data.total_count,
            },
          };
        },
      },
    });

    $('.select2-tides-tags').select2({
      allowClear: true,
      placeholder: 'Add a tag',
      tags: true,
      minimumInputLength: 2,
      ajax: {
        url: '/api/tags/',
        delay: 250,
        data: function (params) {
          return {
            query: params.term, // search term
            page: params.page,
          };
        },
        processResults: function (data, params) {
          params.page = params.page || 1;
          return {
            results: $.map(data, function (obj) {
              return { id: obj.name, text: obj.name };
            }),
            pagination: {
              more: params.page * 30 < data.total_count,
            },
          };
        },
      },
    });

    $('.select2-tides-roles').select2({
      allowClear: true,
      placeholder: 'Add a role',
      minimumInputLength: 2,
      ajax: {
        url: '/api/roles/',
        delay: 250,
        data: function (params) {
          return {
            query: params.term, // search term
            page: params.page,
          };
        },
        processResults: function (data, params) {
          params.page = params.page || 1;
          return {
            results: $.map(data, function (obj) {
              return { id: obj.id, text: obj.name };
            }),
            pagination: {
              more: params.page * 30 < data.total_count,
            },
          };
        },
      },
    });

    $('.select2-tides-presenters').select2({
      allowClear: true,
      placeholder: 'Add a presenter',
      minimumInputLength: 2,
      ajax: {
        url: '/api/presenters/',
        delay: 250,
        data: function (params) {
          return {
            query: params.term, // search term
            page: params.page,
          };
        },
        processResults: function (data, params) {
          params.page = params.page || 1;
          return {
            results: $.map(data, function (obj) {
              return { id: obj.id, text: obj.name };
            }),
            pagination: {
              more: params.page * 30 < data.total_count,
            },
          };
        },
      },
    });

    $('.select2-tides-users').select2({
      placeholder: 'Search for a user',
      minimumInputLength: 2,
      ajax: {
        url: '/api/users/',
        delay: 250,
        data: function (params) {
          return {
            query: params.term, // search term
            page: params.page,
          };
        },
        processResults: function (data, params) {
          params.page = params.page || 1;
          return {
            results: $.map(data, function (obj) {
              return { id: obj.id, text: obj.name };
            }),
            pagination: {
              more: params.page * 30 < data.total_count,
            },
          };
        },
      },
    });

    $('.select2-tides-organization').select2({
      placeholder: 'select an organization',
      minimumInputLength: 2,
      ajax: {
        url: '/api/organizations/',
        delay: 250,
        data: function (params) {
          return {
            query: params.term, // search term
            page: params.page,
          };
        },
        processResults: function (data, params) {
          params.page = params.page || 1;
          return {
            results: $.map(data, function (obj) {
              return { id: obj.id, text: obj.name };
            }),
            pagination: {
              more: params.page * 30 < data.total_count,
            },
          };
        },
      },
    });

    $('.select2-tides-images').select2({
      placeholder: 'Select an image',
      language: 'de',
      minimumInputLength: 2,
      ajax: {
        url: '/api/images/',
        delay: 250,
        dataType: 'json',
        data: function (params) {
          return {
            query: params.term, // search term
            page: params.page,
          };
        },
        processResults: function (data, params) {
          params.page = params.page || 1;
          return {
            results: $.map(data, function (obj) {
              return { id: obj.id, text: obj.name };
            }),
            pagination: {
              more: params.page * 30 < data.total_count,
            },
          };
        },
      },
      templateResult: format,
      templateSelection: formatSelect,
      escapeMarkup: function (m) {
        return m;
      },
    });

    function format(state) {
      if (!state.id) return state.text; // optgroup
      return (
        '<div class="flex items-center"><div>' +
        '<img src="/images/' +
        state.text +
        '" class="mx-auto h-auto w-20 pr-2" />' +
        '</div>' +
        '<div>' +
        state.text.slice(0, 15) +
        '</div>' +
        '</div>'
      );
    }

    function formatSelect(state) {
      if (!state.id) return state.text;
      return state.text;
    }
  },
  false
);

FilePond.registerPlugin(FilePondPluginImagePreview);
FilePond.registerPlugin(FilePondPluginMediaPreview);

const inputElement = document.querySelector('input[type="file"].filepond');
const csrfToken = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute('content');
FilePond.create(inputElement).setOptions({
  server: {
    process: '/admin/uploads/process',
    revert: '/admin/uploads/revert',
    headers: {
      'X-CSRF-TOKEN': csrfToken,
    },
  },
});

const inputElement1 = document.querySelector(
  'input[type="file"].filepond-input1'
);
const csrfToken1 = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute('content');
FilePond.create(inputElement1).setOptions({
  server: {
    process: '/admin/uploads/process',
    revert: '/admin/uploads/revert',
    headers: {
      'X-CSRF-TOKEN': csrfToken1,
    },
  },
});

const inputElement2 = document.querySelector(
  'input[type="file"].filepond-input2'
);
const csrfToken2 = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute('content');
FilePond.create(inputElement2).setOptions({
  server: {
    process: '/admin/uploads/process',
    revert: '/admin/uploads/revert',
    headers: {
      'X-CSRF-TOKEN': csrfToken2,
    },
  },
});

function updateCurrentTimeDisplay(player) {
  const currentTimeInput = document.getElementById('currentTime');

  if (!currentTimeInput) {
    return;
  }

  const currentTime = player.currentTime;
  // Set the initial value of the current time

  // Use addEventListener for the timeupdate event to track time updates
  player.addEventListener('time-update', () => {
    const currentTime = Math.floor(player.currentTime);
    currentTimeInput.value = currentTime; // Update the input value with the current time
  });
}

async function initializePlayer() {
  const layout = new VidstackPlayerLayout({});
  const playerDIV = document.getElementById('target');
  if (!playerDIV) {
    return;
  }
  const player = await VidstackPlayer.create({
    target: document.querySelector('#target'),
    crossOrigin: true,
    playsInline: true,
    viewType: 'video',
    streamType: playerDIV.getAttribute('streamType'),
    layout,
  });

  // Call the function to update the current time display
  updateCurrentTimeDisplay(player);

  playerDIV.addEventListener('play', async () => {
    const player = document.getElementById('target');
    const mediaID = player.getAttribute('mediaID');
    const serviceIDsString = player.getAttribute('serviceIDs');
    const serviceIDsArray = JSON.parse(serviceIDsString);

    try {
      const response = await fetch('/api/logPlayEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')
            .content,
        },
        body: JSON.stringify({
          mediaID: mediaID,
          serviceIDs: serviceIDsArray,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error logging play event:', error);
    }
  });

  // Select and add tracks
  const trackElements = document.querySelectorAll('#target track');
  trackElements.forEach((trackElement) => {
    player.textTracks.add({
      src: trackElement.src,
      kind: trackElement.kind,
      label: trackElement.label,
      srclang: trackElement.srclang,
      default: trackElement.default,
    });
  });

  // Attach event listeners to links
  document.querySelectorAll('.video-link').forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const videoUrl = this.getAttribute('href');
      const currentTime = player.currentTime;
      changeVideoSource(videoUrl, currentTime);
    });
  });

  function changeVideoSource(newSource, currentTime) {
    // Pause the player while switching video
    player.pause();

    // Set the new video source via the fallback method
    player.src = newSource;
    console.log('Fallback to setting src directly:', newSource);

    // Listen for the 'loadedmetadata' event, which ensures the video duration is available
    player.addEventListener(
      'loaded-metadata',
      () => {
        console.log('inside loadedmetadata');

        // Check if the current time is valid and set it
        if (currentTime && currentTime < player.duration) {
          player.currentTime = currentTime;
        } else {
          player.currentTime = 0; // Start from the beginning if currentTime is invalid
        }

        // Play the video after setting the time
        player.play();
      },
      { once: true } // Ensure the event listener is only triggered once
    );
  }

  // Add event listener for play event
  playerDIV.addEventListener('play', async () => {
    const videoId = player.config.mediaId; // Ensure mediaId is set in player config
    const userId = document.querySelector('meta[name="user-id"]').content; // Assuming you have user ID in a meta tag
    const playedAt = new Date().toISOString();

    console.log('videoID', videoId);
    try {
      const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute('content');
      console.log(csrfToken);
      const response = await fetch('/api/log-play-event', {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify({
          video_id: videoId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error logging play event:', error);
    }
  });
}

initializePlayer();
// Assuming the data passed from the Blade template
window.generatePieChart = generatePieChart;
window.generateBarChart = generateBarChart;
window.generateGeolocationLineChart = generateGeolocationLineChart;
window.generateClipViewsLineChart = generateClipViewsLineChart;
