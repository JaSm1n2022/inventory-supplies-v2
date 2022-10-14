import { useEffect, useRef, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';


const RegularGeoLocation = (props) => {
    const inputRef = useRef();
    const autocomplete = useRef();
    const [location, setLocation] = useState('');
    const [isRefresh, setIsRefresh] = useState(false);

    useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries: ['places'],
        version: 'weekly',
        id: 'google-map-script'
    });

    const handleChange = (event) => {
        console.log('handleChange', { [event.target.name]: event.target.value })
        if (event.target.name === 'location') {
            setLocation(event.target.value);
        }
        //  this.setState({ [event.target.name]: event.target.value })
        if (!event.target.value) {
            const payload = {
                formatted: '',
                address: ''
            };
            props.autoFillLocationHandler(payload);
        }
    }

    const handlePlaceSelect = (autoc) => {
        console.log('[this should have been called handlePlaceSelect');
        let addressObject = autoc.getPlace()
        if (!addressObject || !addressObject.formatted_address) {
            // props.alertUserHandler(props.locType,false);
            return;
        }

        let address = '';
        let postcode = '';
        let city = '';
        let state = '';
        let country = '';
        for (const component of addressObject.address_components) {
            // @ts-ignore remove once typings fixed
            const componentType = component.types[0];

            switch (componentType) {
                case 'street_number': {
                    address = `${component.long_name} ${address}`;
                    break;
                }

                case 'route': {
                    address = `${address}${component.short_name}`;
                    break;
                }

                case 'postal_code': {
                    postcode = `${component.long_name}${postcode}`;
                    break;
                }
                /*
                      case 'postal_code_suffix': {
                        postcode = `${postcode}-${component.long_name}`;
                        break;
                      }
                */
                case 'locality':
                    city = component.long_name;
                    break;

                case 'administrative_area_level_1': {
                    state = component.short_name;
                    break;
                }

                case 'country':
                    country = component.short_name;
                    break;

                default:
                    console.log('unexpected componentType', componentType)
                    break;
                }

        }
        setLocation(addressObject.formatted_address);
        setIsRefresh(!isRefresh);
        const payload = {
            address,
            city,
            postcode,
            country,
            state,
            name: props.name,
            location: addressObject.formatted_address,
            formatted: addressObject.address_components
        };
        console.log('[payload auto]', payload);
        props.autoFillLocationHandler(payload);
        if (!postcode || postcode === null) {
            //    props.alertUserHandler(props.locType,false);
        } else {
            //props.displayHandler(payload, props.locType);
        }

    }

    useEffect(() => { // componentDidMount() {


        console.log('[RegularGeoLocation]', props);

        setLocation(props.loc || '');
        setIsRefresh(false);

        if (window.google && window.google.maps && window.google.maps.places) {
            //this.autocomplete = new window.google.maps.places.Autocomplete(document.getElementById(props.id), { types: ['geocode'], componentRestrictions: { country: ['us','mx','ca'] } })
            autocomplete.current = new window.google.maps.places.Autocomplete(document.getElementById(props.id), { types: ['geocode'] })
            autocomplete.current.setFields(['address_components', 'formatted_address']);
            autocomplete.current.addListener('place_changed', () => handlePlaceSelect(autocomplete.current))
        } else {
            console.log('google.maps.places is not loaded');
        }
    }, []);

    useEffect(() => {
        console.log('[props location]', props);
        setLocation(props.loc);
    }, [props.loc]);

    console.log('[location]', location, inputRef);
    const { isError, errorMsg } = props;
    return (
        <form autoComplete='off' noValidate width='100%' className='input-group' style={{ paddingLeft: 0 }}>
            <input id={props.id}
                className='form-control'
                ref={inputRef}
                name='location'
                disabled={props.disabled || false}
                onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                        // Do code here
                        ev.preventDefault();
                    }
                }}
                style={{ background: 'white', height: 40, border: isError ? '1px solid red' : '' }}
                placeholder={props.placeholder || 'Search Address *'}
                value={location}
                onChange={(e) => handleChange(e)}
                type='text' />
            {isError &&
                <div className='col-md-12'>
                    <span style={{ color: 'red' }}>{errorMsg}</span>
                </div>
            }
        </form>
    )
}

export default RegularGeoLocation;