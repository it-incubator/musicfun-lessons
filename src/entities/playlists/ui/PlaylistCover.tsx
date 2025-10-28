import type {components} from "@/shared-layer/api-segment/schema.ts";
import noCoverPlaceholder from "@/assets/no-cover.png";

type PlaylistImagesOutputDTO = components["schemas"]["PlaylistImagesOutputDTO"]
// todo: точнго нам нужно в какой-то мелкий Cover компонент передавать ТАК МНОГО ДАННЫХ о плейлисте?
export const PlaylistCover = ({images, playlistTitle}: { images: PlaylistImagesOutputDTO, playlistTitle: string }) => {
    let url = noCoverPlaceholder;

    if (images.main?.length) {
        url = images.main[0]!.url;
    }

    return <img src={url} style={{width: '200px'}} alt={playlistTitle}/>
}