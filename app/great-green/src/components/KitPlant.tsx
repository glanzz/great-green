import { AvatarGroup, Card, CardContent, Typography } from "@mui/material";
import { Addon, Kit } from "../models/journey";
import { ADDON_ICONS, PLANT_ICONS } from "../constants";
import TextRoundIcon from "./TextRoundIcon";
import {useTranslation} from '../../node_modules/react-i18next';
type Props =  {
  kit: Kit
}

const KitPlant = (props: Props) => {
   //Internationalization
   const {t} = useTranslation('common');
  const plantIcon = PLANT_ICONS[props.kit.plant.type];
  const addonsPresent = !!(props.kit.addons && props.kit.addons.length);
  return(
    <Card elevation={2} sx={{ width: "fit-content", textAlign: "center", padding: "10px", margin: "10px" }}>
      <Typography color={"primary"} fontWeight={"bold"}>{t('kit.card.title')}</Typography>
      <CardContent sx={{textAlign: "center", marginTop: "20px", alignItems: "center", display: "flex", flexDirection: "column"}}>
        <TextRoundIcon name={props.kit.plant.name} img={plantIcon} />
        {addonsPresent && (
          <>
          <Typography sx={{marginTop: "30px", marginBottom: "12px", fontSize: "14px"}} color="primary">{t('kit.card.content')}</Typography>
          <AvatarGroup>
            {
              props.kit.addons.map((addon: Addon) => {
                const addonIcon = ADDON_ICONS[addon.type];
                return (
                  <TextRoundIcon name={addon.name} img={addonIcon} small />
                );
              })
            }
          </AvatarGroup>
          </>
        )}
      </CardContent>
    </Card>
  )
};


export default KitPlant;
