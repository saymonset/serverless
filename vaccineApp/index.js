/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { VaccineApp } from './src/VaccineApp';
import './src/presentation/screens/i18n/i18n.config'

AppRegistry.registerComponent(appName, () => VaccineApp);
