import { useNavigation } from '@react-navigation/native';
import { Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions, Platform } from 'react-native';
import { SearchInputComponent } from '../components/SearchInputComponent';
import { MyIcon } from '../components/ui/MyIcon';


interface Props {
  title: string;
  subTitle?: string;

  rightAction?: () => void;
  rightActionIcon?: string;
  setTerm?:( value: string )=>void,
  children?: React.ReactNode ;
}

const screenWidth = Dimensions.get("window").width;

export const MainLayout = ({
  title,
  subTitle,
  rightAction,
  rightActionIcon,
  setTerm,
  children,
}: Props) => {

  const { top } = useSafeAreaInsets();
  const { canGoBack, goBack } = useNavigation();


  const renderBackAction = () => (
    <TopNavigationAction 
      icon={ <MyIcon name="arrow-back-outline" /> }
      onPress={ goBack }
    />
  )

  const RenderSearch = ()=>  {
    if (setTerm == undefined || setTerm === undefined) return null;
    return (
      <SearchInputComponent
                       onDebounce={ setTerm}
                       style={{
                         position: 'absolute',
                         zIndex: 999,
                         width: screenWidth - 40,
                         top: (Platform.OS === 'ios') ? top +0 : top + 0
                       }}   ></SearchInputComponent>
    );
  }

  const RenderRightAction = () => {

    if ( rightAction === undefined || rightActionIcon === undefined ) return null;

    return (
      <TopNavigationAction 
        onPress={ rightAction }
        icon={ <MyIcon name={rightActionIcon} /> }
      />
    )
  }



  return (
    <Layout style={{ paddingTop: top, flex:1}}>
      <TopNavigation 
        title={ title }
        subtitle={ subTitle }
        alignment="center"
        accessoryLeft={ canGoBack() ? renderBackAction : undefined }
        accessoryRight={ () => <RenderRightAction /> }
        
      />

      <Divider />
      
   

      <Layout style={{ flex:1}}>
           {setTerm && ( <Layout style={{marginTop:10, marginHorizontal:20}}>
            {  RenderSearch()}
            </Layout>)} 
        <Layout  style={{ flex:1, marginTop:60 }}>
            {children}
        </Layout>
        
      </Layout>
      
    </Layout>
  );
};
