import {
  AkaDora,
  ChanFon,
  ChanKan,
  Chanta,
  Chiho,
  ChiiToitsu,
  Chinitsu,
  ChinRoutou,
  Chun,
  ChurenPoutou,
  DaiSanGen,
  DaiSushi,
  Dora,
  DoubleRiichi,
  Haitei,
  Haku,
  Hatsu,
  Honitsu,
  HonRoutou,
  Houtei,
  IkkiTsuukan,
  IpeiKou,
  Ippatsu,
  JunChanta,
  JunseiChurenPoutou,
  KazoeYakuman,
  KokushiMusou,
  KokushiMusou13MenMachi,
  MenFon,
  MenzenTsumo,
  NagashiMangan,
  OpenRiichi,
  Pinfu,
  RenFon,
  Riichi,
  RinshanKaihou,
  RyanPeiKou,
  RyuIsou,
  SanAnkou,
  SanKantsu,
  SanShokuDouJun,
  SanShokuDouKou,
  ShouSanGen,
  ShouSushi,
  SuAnkou,
  SuAnkouTankiMachi,
  SuKantsu,
  Tanyao,
  Tenho,
  ToiToi,
  TsuIsou,
  UraDora,
} from "../Yaku";
import {
  Ankan,
  Ankou,
  ChanFonPai,
  Futei,
  MenFonPai,
  MenzenKafu,
  Minkan,
  Minkou,
  RenFonPai,
  SangenPai,
  Tsumo,
} from "../Fu";
import { PaiName, PaiNamePattern } from "../@types/types";
import { PaiGenerator } from "../Utilities/PaiGenerator";
import { PaiPatternExtractor } from "../Runtime/Extractor/Extractor";

const paiNumberName = {
  "1": "一",
  "2": "二",
  "3": "三",
  "4": "四",
  "5": "五",
  "6": "六",
  "7": "七",
  "8": "八",
  "9": "九",
};
const paiGroupNamePatterns = {
  m: { name: "萬子" },
  p: { name: "筒子" },
  s: { name: "索子" },
  "1-4z": {
    name: "字牌",
    patterns: { "1": "東", "2": "南", "3": "西", "4": "北" },
  },
  "5-7z": { name: "三元牌", patterns: { "5": "白", "6": "発", "7": "中" } },
};

type TranslationType = Record<
  PaiName,
  { number: number; name: string; groupName: string }
>;
const generateTranslation = (generator: PaiGenerator) =>
  generator.generate().reduce<TranslationType>((carry, value) => {
    const [number, group] = PaiPatternExtractor.extractPaiPair(value);
    return {
      ...carry,
      [value]: {
        number: parseInt(number),
        name: paiNumberName[number],
        groupName:
          group === "z"
            ? parseInt(number) > 4
              ? paiGroupNamePatterns["5-7z"].name
              : paiGroupNamePatterns["1-4z"].name
            : paiGroupNamePatterns[group].name,
      },
    };
  }, {} as TranslationType);

export default {
  ja: {
    pai: {
      ...generateTranslation(new PaiGenerator("1", "9", "m")),
      ...generateTranslation(new PaiGenerator("1", "9", "p")),
      ...generateTranslation(new PaiGenerator("1", "9", "s")),
      ...generateTranslation(new PaiGenerator("1", "7", "z")),
    },
    fu: {
      [Futei.name]: "基本符",
      [Ankou.name]: "暗刻",
      [Minkou.name]: "明刻",
      [Ankan.name]: "暗槓",
      [Minkan.name]: "明槓",
      [Tsumo.name]: "ツモ符",
      [MenzenKafu.name]: "門前加付",
      [MenFonPai.name]: "自風牌",
      [ChanFonPai.name]: "場風牌",
      [SangenPai.name]: "三元牌",
      [RenFonPai.name]: "連風牌",
    },
    yaku: {
      // Hands
      [Tanyao.name]: "断么九",
      [Chanta.name]: "混全帯么九",
      [Honitsu.name]: "混一色",
      [Chinitsu.name]: "清一色",
      [Pinfu.name]: "平和",
      [Houtei.name]: "河底撈魚",
      [Haitei.name]: "海底摸月",
      [Riichi.name]: "リーチ",
      [DoubleRiichi.name]: "リーチ",
      [OpenRiichi.name]: "オープンリーチ",
      [RinshanKaihou.name]: "嶺上開花",
      [RenFon.name]: "ダブル風役",
      [ChanFon.name]: "場風役",
      [MenFon.name]: "自風役",
      [Ippatsu.name]: "一発",
      [MenzenTsumo.name]: "門前清自摸",
      [Haku.name]: "白",
      [Hatsu.name]: "発",
      [Chun.name]: "中",
      [ChanKan.name]: "槍槓",
      [IpeiKou.name]: "一盃口",
      [RyanPeiKou.name]: "二盃口",
      [ToiToi.name]: "対々和",
      [SanAnkou.name]: "三暗刻",
      [JunChanta.name]: "純全帯么九",
      [SanShokuDouKou.name]: "三色同刻",
      [SanShokuDouJun.name]: "三色同順",
      [SanKantsu.name]: "三槓子",
      [ChiiToitsu.name]: "七対子",
      [HonRoutou.name]: "混老頭",
      [IkkiTsuukan.name]: "一気通貫",
      [ShouSanGen.name]: "小三元",
      [NagashiMangan.name]: "流し満貫",
      [SuAnkou.name]: "四暗刻",
      [ChinRoutou.name]: "清老頭",
      [SuKantsu.name]: "四槓子",
      [TsuIsou.name]: "字一色",
      [Tenho.name]: "天和",
      [Chiho.name]: "地和",
      [RyuIsou.name]: "緑一色",
      [KokushiMusou.name]: "国士無双",
      [ChurenPoutou.name]: "九蓮宝燈",
      [DaiSanGen.name]: "大三元",
      [ShouSushi.name]: "小四喜",
      [DaiSushi.name]: "大四喜",
      [KokushiMusou13MenMachi.name]: "国士無双十三面待ち",
      [SuAnkouTankiMachi.name]: "四暗刻単騎待ち",
      [JunseiChurenPoutou.name]: "純正九蓮宝燈",
      [KazoeYakuman.name]: "数え役満",

      // Dora
      [Dora.name]: "ドラ",
      [UraDora.name]: "裏ドラ",
      [AkaDora.name]: "赤ドラ",
    },
  },
};
