import React from 'react'
import { ImageBackground, SectionList, Text, View } from 'react-native';
import { HeaderTitle } from '../components/HeaderTitle';
import { ItemSeparator } from '../components/ItemSeparator';
import { styles } from '../theme/appTheme';


interface Casas {
    casa: string;
    data: string[];
}

const casas: Casas[] = [
    {
      casa: "DC Comics",
      data: ["Batman", "Superman", "Robin", "Batman", "Superman", "Robin", "Batman", "Superman", "Robin", "Batman", "Superman", "Robin", "Batman", "Superman", "Robin", "Batman", "Superman", "Robin", "Batman", "Superman", "Robin", ]
    },
    {
      casa: "Marvel Comics",
      data: ["Antman", "Thor", "Spiderman","Antman","Antman", "Thor", "Spiderman","Antman","Antman", "Thor", "Spiderman","Antman","Antman", "Thor", "Spiderman","Antman","Antman", "Thor", "Spiderman","Antman", ]
    },
    {
      casa: "Anime",
      data: ["Kenshin", "Goku", "Saitama","Kenshin", "Goku", "Saitama","Kenshin", "Goku", "Saitama","Kenshin", "Goku", "Saitama","Kenshin", "Goku", "Saitama","Kenshin", "Goku", "Saitama", ]
    }
];

export const CustomSectionListScreen = () => {
  return (
    <View style={ {...styles.globalMargin}}>
        {/* <HeaderTitle  title="Section List"/> */}
        <SectionList
                sections={ casas }
                keyExtractor={ (item,index) => item+index}
              
                ListHeaderComponent= { () => <HeaderTitle title='Section List'></HeaderTitle>}
                ListFooterComponent= { () => (
                    <View style= {{marginBottom:100}}>
                        <HeaderTitle title= {'Total de casas ' + casas.length } ></HeaderTitle> 
                    </View>
                )}

                renderItem={ ( {item} ) => <Text> { item }</Text>}
                stickySectionHeadersEnabled={true}
                //renderSectionHeader={ ({ section: { casa})=><HeaderTitle title={ casa }/>}
                renderSectionHeader={ ({ section})=> (
                <View style = {{ backgroundColor:'white'}}>
                        <HeaderTitle title={ section.casa }/>
                </View> 
               )}
            renderSectionFooter = { ( { section} ) => (
                <HeaderTitle title = {'Total: ' + section.data.length} />
            )}

            SectionSeparatorComponent= { () => <ItemSeparator/>}
            // ItemSeparatorComponent = { () => <ItemSeparator/>}
            showsVerticalScrollIndicator = { false }

        />
        </View>
  )
}
