import { el } from 'redom';
import { Loader } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { getAtmsLocation } from '../utils/api';

const renderAtmMap = async () => {
  const atmsLocations = await getAtmsLocation();
  atmsLocations.forEach((location) => {
    location['lng'] = location['lon'];
    delete location['lon'];
  });

  const container = el(
    'div.container',
    el('h2.section-header.atms__heading', 'ATMs Location')
  );
  const mapContainer = el('div.atms__map#atms-map');

  const loader = new Loader({
    apiKey: 'AIzaSyC3MWE1AptfhoDzq5rkgbdz-SQmAWig5Cw',
    version: 'weekly',
  });

  loader.load().then(async () => {
    const map = await new google.maps.Map(mapContainer, {
      center: { lat: 55.75221259626334, lng: 37.621441983104894 },
      zoom: 9,
    });
    const markers = atmsLocations.map((position) => {
      const marker = new google.maps.Marker({
        position,
        icon: {
          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          strokeColor: '#116acc',
          scale: 4,
        },
      });
      return marker;
    });
    new MarkerClusterer({ map, markers });
  });

  container.append(mapContainer);

  return container;
};

export { renderAtmMap as default };
