-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th10 21, 2023 lúc 11:17 PM
-- Phiên bản máy phục vụ: 5.7.43
-- Phiên bản PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `game`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `banghoi`
--

CREATE TABLE `banghoi` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `info` text COLLATE latin1_general_ci,
  `menber` text COLLATE latin1_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Đang đổ dữ liệu cho bảng `banghoi`
--

INSERT INTO `banghoi` (`id`, `name`, `info`, `menber`) VALUES
(3, 'may la nha', '{\"icon\":5,\"exp\":0,\"level\":1,\"max\":10,\"desc\":\"admin vai lon dit me may dmin vai lon dit me may dmin vai lon dit me may dmin vai lon dit me may\",\"vang\":0,\"sucmanh\":0,\"time\":1687942389022}', '[{\"id\":1,\"time\":1688003998293,\"right\":2,\"name\":\"test\",\"skin\":{\"ao\":\"OdcEjQVJAu\",\"quan\":\"wlOVtVQfck\",\"dau\":\"sFMvEpAPHB\",\"theobo\":\"\",\"bang\":5,\"bangID\":3,\"coPK\":0},\"avatar\":518,\"sucmanh\":73991147616,\"chodau\":0,\"nhandau\":0},{\"id\":1064,\"time\":1688012789651,\"right\":0,\"name\":\"11111\",\"skin\":{\"ao\":\"ShKDzlJEkr\",\"quan\":\"VwUvuLvFKR\",\"dau\":\"QbPhVhGmRc\",\"bang\":5,\"bangID\":3},\"avatar\":518,\"sucmanh\":5422,\"chodau\":0,\"nhandau\":0},{\"id\":1085,\"time\":1689232819988,\"right\":0,\"name\":\"tiuvip\",\"skin\":{\"ao\":\"VqyVqCVEwt\",\"quan\":\"DVlmZNfDhj\",\"dau\":\"lMzpmFtgCj\",\"theobo\":\"\",\"bang\":5,\"bangID\":3,\"coPK\":0},\"avatar\":523,\"sucmanh\":1000,\"chodau\":0,\"nhandau\":0}]'),
(4, 'oc lon', '{\"icon\":1,\"exp\":0,\"level\":1,\"max\":10,\"desc\":\"admin vai lon dit me may dmin vai lon dit me may dmin vai lon dit me may dmin vai lon dit me may\",\"vang\":0,\"sucmanh\":0,\"time\":1687942389022}', '[{\"id\":2,\"time\":1687942389022,\"right\":2,\"name\":\"test\",\"skin\":{\"ao\":\"OdcEjQVJAu\",\"quan\":\"wlOVtVQfck\",\"dau\":\"sFMvEpAPHB\",\"bang\":5,\"bangID\":-1},\"avatar\":518,\"chodau\":0,\"nhandau\":0}]');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `log`
--

CREATE TABLE `log` (
  `id` int(11) NOT NULL,
  `uid` bigint(20) NOT NULL,
  `created_date` date NOT NULL,
  `created_time_int` bigint(20) NOT NULL,
  `MSG` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `json` text COLLATE latin1_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci
PARTITION BY RANGE (to_days(`created_date`))
(
PARTITION p0 VALUES LESS THAN (738156) ENGINE=InnoDB,
PARTITION p_2023_06_28 VALUES LESS THAN (739065) ENGINE=InnoDB,
PARTITION p_2023_06_29 VALUES LESS THAN (739066) ENGINE=InnoDB,
PARTITION p_2023_06_30 VALUES LESS THAN (739067) ENGINE=InnoDB,
PARTITION p_2023_07_01 VALUES LESS THAN (739068) ENGINE=InnoDB,
PARTITION p_2023_07_02 VALUES LESS THAN (739069) ENGINE=InnoDB,
PARTITION p_2023_07_03 VALUES LESS THAN (739070) ENGINE=InnoDB,
PARTITION p_2023_07_04 VALUES LESS THAN (739071) ENGINE=InnoDB,
PARTITION p_2023_07_05 VALUES LESS THAN (739072) ENGINE=InnoDB,
PARTITION p_2023_07_06 VALUES LESS THAN (739073) ENGINE=InnoDB,
PARTITION p_2023_07_07 VALUES LESS THAN (739074) ENGINE=InnoDB,
PARTITION p_2023_07_08 VALUES LESS THAN (739075) ENGINE=InnoDB,
PARTITION p_2023_07_09 VALUES LESS THAN (739076) ENGINE=InnoDB,
PARTITION p_2023_07_10 VALUES LESS THAN (739077) ENGINE=InnoDB,
PARTITION p_2023_07_11 VALUES LESS THAN (739078) ENGINE=InnoDB,
PARTITION p_2023_07_12 VALUES LESS THAN (739079) ENGINE=InnoDB,
PARTITION p_2023_07_13 VALUES LESS THAN (739080) ENGINE=InnoDB,
PARTITION p_2023_07_14 VALUES LESS THAN (739081) ENGINE=InnoDB,
PARTITION p_2023_07_15 VALUES LESS THAN (739082) ENGINE=InnoDB,
PARTITION p_2023_07_16 VALUES LESS THAN (739083) ENGINE=InnoDB,
PARTITION p_2023_07_17 VALUES LESS THAN (739084) ENGINE=InnoDB,
PARTITION p_2023_07_18 VALUES LESS THAN (739085) ENGINE=InnoDB,
PARTITION p_2023_07_19 VALUES LESS THAN (739086) ENGINE=InnoDB,
PARTITION p_2023_07_20 VALUES LESS THAN (739087) ENGINE=InnoDB,
PARTITION p_2023_07_21 VALUES LESS THAN (739088) ENGINE=InnoDB,
PARTITION p_2023_07_22 VALUES LESS THAN (739089) ENGINE=InnoDB,
PARTITION p_2023_07_23 VALUES LESS THAN (739090) ENGINE=InnoDB,
PARTITION p_2023_07_24 VALUES LESS THAN (739091) ENGINE=InnoDB,
PARTITION p_2023_07_25 VALUES LESS THAN (739092) ENGINE=InnoDB,
PARTITION p_2023_07_26 VALUES LESS THAN (739093) ENGINE=InnoDB,
PARTITION p_2023_08_01 VALUES LESS THAN (739099) ENGINE=InnoDB,
PARTITION p_2023_08_02 VALUES LESS THAN (739100) ENGINE=InnoDB,
PARTITION p_2023_08_08 VALUES LESS THAN (739106) ENGINE=InnoDB,
PARTITION p_2023_11_16 VALUES LESS THAN (739206) ENGINE=InnoDB,
PARTITION p_2023_11_17 VALUES LESS THAN (739207) ENGINE=InnoDB,
PARTITION p_2023_11_18 VALUES LESS THAN (739208) ENGINE=InnoDB,
PARTITION p_2023_11_20 VALUES LESS THAN (739210) ENGINE=InnoDB,
PARTITION p_2023_11_22 VALUES LESS THAN (739212) ENGINE=InnoDB
);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhanvat`
--

CREATE TABLE `nhanvat` (
  `id` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `server` int(11) DEFAULT NULL,
  `name` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `nhiemvu` text COLLATE latin1_general_ci,
  `tien` text COLLATE latin1_general_ci,
  `used` text COLLATE latin1_general_ci,
  `eff` text COLLATE latin1_general_ci,
  `skin` text COLLATE latin1_general_ci,
  `trangbi` text COLLATE latin1_general_ci,
  `ruong` text COLLATE latin1_general_ci,
  `skill` text COLLATE latin1_general_ci,
  `oskill` text COLLATE latin1_general_ci,
  `info` text COLLATE latin1_general_ci,
  `pos` text COLLATE latin1_general_ci,
  `detu` text COLLATE latin1_general_ci,
  `khac` text COLLATE latin1_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nhanvat`
--

INSERT INTO `nhanvat` (`id`, `uid`, `server`, `name`, `nhiemvu`, `tien`, `used`, `eff`, `skin`, `trangbi`, `ruong`, `skill`, `oskill`, `info`, `pos`, `detu`, `khac`) VALUES
(1, 1, 1, 'test', '{}', '{\"beri\":19846334510,\"ruby\":89675}', '', '[]', '{\"dau\":\"iLvVMIbTpy\",\"ao\":\"kFFosytneB\",\"quan\":\"qYPWPKZhcQ\",\"toc\":\"vAiaeYISIt\",\"non\":\"vqFwgeDhai\",\"lung\":\"axDwxOtydX\",\"tay\":\"axDwxOtydX\",\"id\":null}', '{\"vukhi\":0,\"daychuyen\":0,\"nhan\":0,\"non\":0,\"ao\":\"flgJUAHaZ0E\",\"quan\":\"vQzYsx4Cc3s\",\"toc\":0,\"caitrang\":{},\"face\":0}', '{\"data\":[{\"id\":\"gET1JoyulTP\",\"phamchat\":0,\"dong\":[],\"mayman\":0,\"level\":7,\"lo\":[-1,-1,-1,-1],\"time\":1700151551619,\"item\":\"1\",\"soluong\":1,\"active\":\"hanhtrang\"},{\"id\":\"la6EgTD37rm\",\"time\":1700099899952,\"item\":\"xzcd\",\"soluong\":172,\"active\":\"hanhtrang\"},{\"id\":\"OFSS6KiEyvE\",\"time\":1700099901271,\"item\":\"t4fc\",\"soluong\":143,\"active\":\"hanhtrang\"},{\"id\":\"QacK1XfXQCg\",\"time\":1700107257139,\"item\":\"ftrt\",\"soluong\":990,\"active\":\"hanhtrang\"},{\"id\":\"RbIVgI4LLOv\",\"time\":1700124369685,\"item\":\"ghty\",\"soluong\":50,\"active\":\"hanhtrang\"},{\"id\":\"jrfW2YIkkDe\",\"time\":1700124371421,\"item\":\"xcxcvv\",\"soluong\":84,\"active\":\"hanhtrang\"},{\"id\":\"XHAfr8isbNu\",\"phamchat\":1,\"dong\":[],\"mayman\":3,\"level\":10,\"lo\":[-1,-1,-1,-1],\"time\":1700304069989,\"item\":\"1\",\"soluong\":1,\"active\":\"hanhtrang\"},{\"id\":\"MfgGm6jC4Hz\",\"time\":1700144294167,\"item\":\"t456456\",\"soluong\":56212,\"active\":\"hanhtrang\"},{\"id\":\"9A18H0AGyUM\",\"phamchat\":1,\"dong\":[],\"mayman\":3,\"level\":10,\"lo\":[-1,-1,-1,-1],\"time\":1700239399041,\"item\":\"1\",\"soluong\":1,\"active\":\"hanhtrang\"},{\"id\":\"flgJUAHaZ0E\",\"phamchat\":4,\"dong\":[\"khang_phep\",\"khang_vat_ly\"],\"mayman\":16,\"level\":10,\"lo\":[\"fgttt\",\"fgttt\",\"fgttt\",\"fgttt\"],\"time\":1700449921862,\"item\":1,\"soluong\":1,\"active\":\"trangbi\"},{\"id\":\"ozCRqvvAtCZ\",\"phamchat\":1,\"dong\":[],\"mayman\":1,\"level\":10,\"lo\":[-1,-1,-1,-1],\"time\":1700241134306,\"item\":\"1\",\"soluong\":1,\"active\":\"hanhtrang\"},{\"id\":\"eXWSzOrP5Sl\",\"phamchat\":1,\"dong\":[],\"mayman\":1,\"level\":10,\"lo\":[-1,-1,-1,-1],\"time\":1700241176313,\"item\":\"1\",\"soluong\":1,\"active\":\"hanhtrang\"},{\"id\":\"ybkxjLTVEev\",\"phamchat\":1,\"dong\":[],\"mayman\":2,\"level\":10,\"lo\":[-1,-1,-1,-1],\"time\":1700241178423,\"item\":\"1\",\"soluong\":1,\"active\":\"hanhtrang\"},{\"id\":\"Ri84N6pRddU\",\"phamchat\":1,\"dong\":[],\"mayman\":3,\"level\":2,\"lo\":[\"fgttt\",-1,-1,-1],\"time\":1700304416750,\"item\":\"1\",\"soluong\":1,\"active\":\"hanhtrang\"},{\"id\":\"jMxnQcXl2Nk\",\"time\":1700292753644,\"item\":\"ft6ty\",\"soluong\":45,\"active\":\"hanhtrang\"},{\"id\":\"VCGQvsaAq2y\",\"time\":1700301382060,\"item\":\"fgttt\",\"soluong\":45,\"active\":\"hanhtrang\"},{\"id\":\"vQzYsx4Cc3s\",\"phamchat\":1,\"dong\":[],\"mayman\":2,\"level\":0,\"lo\":[-1,-1,-1,-1],\"time\":1700449826454,\"item\":\"c3454\",\"soluong\":1,\"active\":\"trangbi\"},{\"id\":\"STPWga7W13A\",\"phamchat\":1,\"dong\":[],\"mayman\":1,\"level\":0,\"lo\":[-1,-1,-1,-1],\"time\":1700449921862,\"item\":\"xcvrrt\",\"soluong\":1,\"active\":\"hanhtrang\"}],\"max\":20}', '[[1,0,1700607568517,19312,1700607568017],[2,0,1700568300302,1775,1700568298802],[3,0,1700607579761,1176,1700607577761],[200,0,1699783189034,0,1699783188534],[300,0,0,0,0]]', '[1,2,3,\"la6EgTD37rm\",\"OFSS6KiEyvE\",-1,-1,-1,-1,-1]', '{\"coban\":{\"level\":13,\"exp\":73570,\"he\":1,\"speed\":5},\"tiemnang\":{\"sucmanh\":0,\"phongthu\":0,\"theluc\":0,\"tinhthan\":0,\"nhanhnhen\":0},\"chiso\":{\"hp\":13,\"mp\":245,\"hpmax\":774,\"mpmax\":62168,\"sat_thuong_phep\":0,\"sat_thuong_vat_ly\":1639,\"_haki\":0,\"haki\":0,\"_sat_thuong_phep\":0,\"_sat_thuong_vat_ly\":0,\"khang_phep\":7,\"_khang_phep\":0,\"khang_vat_ly\":7,\"_khang_vat_ly\":0,\"_hpmax\":674,\"_mpmax\":674,\"hoi_chieu\":0,\"_sat_thuong_chi_mang\":0,\"_chi_mang\":0,\"_giam_sat_thuong_chi_mang\":0,\"_hoi_mau\":0,\"_hoi_mp\":0,\"_tru_mp\":0,\"_tru_hp\":0,\"sat_thuong_chi_mang\":0,\"chi_mang\":0,\"giam_sat_thuong_chi_mang\":0,\"hoi_mau\":0,\"hoi_mp\":0,\"tru_mp\":0,\"tru_hp\":0,\"vatli\":1624,\"vatly\":1624}}', '{\"x\":2098,\"y\":533,\"zone\":1,\"map\":1}', '', '{}'),
(2, 2, 1, 'daubep', '{}', '{\"beri\":19846334512,\"ruby\":89665}', '', '[]', '{\"dau\":\"iLvVMIbTpy\",\"ao\":\"kFFosytneB\",\"quan\":\"yEIqrdJLIw\",\"toc\":\"vAiaeYISIt\",\"non\":\"axDwxOtydX\",\"lung\":\"axDwxOtydX\",\"tay\":\"KaVgueHoaP\",\"id\":null}', '{\"vukhi\":0,\"daychuyen\":0,\"nhan\":0,\"non\":0,\"ao\":\"flgJUAHaZ0E\",\"quan\":0,\"toc\":0,\"caitrang\":{},\"face\":0}', '{\"data\":[{\"id\":\"gET1JoyulTP\",\"phamchat\":0,\"dong\":[],\"mayman\":0,\"level\":7,\"lo\":[-1,-1,-1,-1],\"time\":1700151551619,\"item\":\"1\",\"soluong\":1,\"active\":\"hanhtrang\"},{\"id\":\"la6EgTD37rm\",\"time\":1700099899952,\"item\":\"xzcd\",\"soluong\":174,\"active\":\"hanhtrang\"},{\"id\":\"OFSS6KiEyvE\",\"time\":1700099901271,\"item\":\"t4fc\",\"soluong\":144,\"active\":\"hanhtrang\"},{\"id\":\"QacK1XfXQCg\",\"time\":1700107257139,\"item\":\"ftrt\",\"soluong\":990,\"active\":\"hanhtrang\"},{\"id\":\"RbIVgI4LLOv\",\"time\":1700124369685,\"item\":\"ghty\",\"soluong\":50,\"active\":\"hanhtrang\"},{\"id\":\"jrfW2YIkkDe\",\"time\":1700124371421,\"item\":\"xcxcvv\",\"soluong\":84,\"active\":\"hanhtrang\"},{\"id\":\"XHAfr8isbNu\",\"phamchat\":1,\"dong\":[],\"mayman\":3,\"level\":10,\"lo\":[-1,-1,-1,-1],\"time\":1700304069989,\"item\":\"1\",\"soluong\":1,\"active\":\"hanhtrang\"},{\"id\":\"MfgGm6jC4Hz\",\"time\":1700144294167,\"item\":\"t456456\",\"soluong\":56212,\"active\":\"hanhtrang\"},{\"id\":\"9A18H0AGyUM\",\"phamchat\":1,\"dong\":[],\"mayman\":3,\"level\":10,\"lo\":[-1,-1,-1,-1],\"time\":1700239399041,\"item\":\"1\",\"soluong\":1,\"active\":\"hanhtrang\"},{\"id\":\"flgJUAHaZ0E\",\"phamchat\":4,\"dong\":[\"khang_phep\",\"khang_vat_ly\"],\"mayman\":16,\"level\":10,\"lo\":[\"fgttt\",\"fgttt\",\"fgttt\",\"fgttt\"],\"time\":1700304416750,\"item\":1,\"soluong\":1,\"active\":\"trangbi\"},{\"id\":\"ozCRqvvAtCZ\",\"phamchat\":1,\"dong\":[],\"mayman\":1,\"level\":10,\"lo\":[-1,-1,-1,-1],\"time\":1700241134306,\"item\":\"1\",\"soluong\":1,\"active\":\"hanhtrang\"},{\"id\":\"eXWSzOrP5Sl\",\"phamchat\":1,\"dong\":[],\"mayman\":1,\"level\":10,\"lo\":[-1,-1,-1,-1],\"time\":1700241176313,\"item\":\"1\",\"soluong\":1,\"active\":\"hanhtrang\"},{\"id\":\"ybkxjLTVEev\",\"phamchat\":1,\"dong\":[],\"mayman\":2,\"level\":10,\"lo\":[-1,-1,-1,-1],\"time\":1700241178423,\"item\":\"1\",\"soluong\":1,\"active\":\"hanhtrang\"},{\"id\":\"Ri84N6pRddU\",\"phamchat\":1,\"dong\":[],\"mayman\":3,\"level\":2,\"lo\":[\"fgttt\",-1,-1,-1],\"time\":1700304416750,\"item\":\"1\",\"soluong\":1,\"active\":\"hanhtrang\"},{\"id\":\"jMxnQcXl2Nk\",\"time\":1700292753644,\"item\":\"ft6ty\",\"soluong\":45,\"active\":\"hanhtrang\"},{\"id\":\"VCGQvsaAq2y\",\"time\":1700301382060,\"item\":\"fgttt\",\"soluong\":45,\"active\":\"hanhtrang\"}],\"max\":20}', '[[1,0,1700321588982,16016,1700321588482],[2,0,1700321499373,1676,1700321497873],[3,0,1700321497666,1105,1700321495666],[200,0,1699783189034,0,1699783188534],[300,0,0,0,0],[4,0,1700540497150,627,1700540496150],[5,0,1700324033217,79,1700324031217],[6,0,1700324040888,80,1700324032888]]', '[4,5,6,\"la6EgTD37rm\",\"OFSS6KiEyvE\",-1,-1,-1,-1,-1]', '{\"coban\":{\"level\":13,\"exp\":47111,\"he\":2,\"speed\":5},\"tiemnang\":{\"sucmanh\":0,\"phongthu\":0,\"theluc\":0,\"tinhthan\":0,\"nhanhnhen\":0},\"chiso\":{\"hp\":100,\"mp\":2437,\"hpmax\":672,\"mpmax\":33412,\"sat_thuong_phep\":0,\"sat_thuong_vat_ly\":15,\"_haki\":0,\"haki\":0,\"_sat_thuong_phep\":0,\"_sat_thuong_vat_ly\":0,\"khang_phep\":7,\"_khang_phep\":0,\"khang_vat_ly\":7,\"_khang_vat_ly\":0,\"_hpmax\":572,\"_mpmax\":572,\"hoi_chieu\":0,\"_sat_thuong_chi_mang\":0,\"_chi_mang\":0,\"_giam_sat_thuong_chi_mang\":0,\"_hoi_mau\":0,\"_hoi_mp\":0,\"_tru_mp\":0,\"_tru_hp\":0,\"sat_thuong_chi_mang\":0,\"chi_mang\":0,\"giam_sat_thuong_chi_mang\":0,\"hoi_mau\":0,\"hoi_mp\":0,\"tru_mp\":0,\"tru_hp\":0}}', '{\"x\":1978,\"y\":900,\"zone\":1,\"map\":1}', '', '{}'),
(3, 1, 1, 'xcvvx', '{}', '{\"beri\":0,\"ruby\":0}', NULL, '[]', '{\"dau\":\"iLvVMIbTpy\",\"ao\":\"HNbjvDRvQM\",\"quan\":\"TEjmlGHLxb\",\"toc\":\"gJhSCfBzai\",\"non\":\"axDwxOtydX\",\"lung\":\"qMXbcUQWdM\",\"tay\":\"axDwxOtydX\",\"id\":null}', '{\"vukhi\":0,\"daychuyen\":0,\"nhan\":0,\"non\":0,\"ao\":0,\"quan\":0,\"toc\":0,\"caitrang\":{},\"face\":0}', '{\"data\":[],\"max\":20}', '[[7,0,1700447332595,455,1700447331595],[8,0,1700447337291,0,1700447335291],[10,0,1700447335708,0,1700447327708]]', '[7,8,10,-1,-1,-1,-1,-1,-1,-1]', '{\"coban\":{\"he\":3,\"level\":3,\"exp\":1999,\"speed\":5},\"tiemnang\":{\"sucmanh\":0,\"phongthu\":0,\"theluc\":0,\"tinhthan\":0,\"nhanhnhen\":0},\"chiso\":{\"hp\":100,\"mp\":62,\"hpmax\":100,\"mpmax\":100,\"sat_thuong_phep\":0,\"sat_thuong_vat_ly\":15,\"_haki\":0,\"haki\":0,\"_sat_thuong_phep\":0,\"_sat_thuong_vat_ly\":0,\"khang_phep\":0,\"_khang_phep\":0,\"khang_vat_ly\":0,\"_khang_vat_ly\":0,\"_hpmax\":0,\"_mpmax\":0,\"hoi_chieu\":0,\"_sat_thuong_chi_mang\":0,\"_chi_mang\":0,\"_giam_sat_thuong_chi_mang\":0,\"_hoi_mau\":0,\"_hoi_mp\":0,\"_tru_mp\":0,\"_tru_hp\":0,\"sat_thuong_chi_mang\":0,\"chi_mang\":0,\"giam_sat_thuong_chi_mang\":0,\"hoi_mau\":0,\"hoi_mp\":0,\"tru_mp\":0,\"tru_hp\":0}}', '{\"x\":2717,\"y\":629,\"zone\":1,\"map\":1}', NULL, '{}'),
(4, 1, 1, 'oclon', '{}', '{\"beri\":0,\"ruby\":0}', NULL, '[]', '{\"dau\":\"iLvVMIbTpy\",\"ao\":\"QTIydsakBM\",\"quan\":\"sFQjWHwTeb\",\"toc\":\"vAiaeYISIt\",\"non\":\"axDwxOtydX\",\"lung\":\"axDwxOtydX\",\"tay\":\"TKHxwNhWSU\",\"id\":null}', '{\"vukhi\":0,\"daychuyen\":0,\"nhan\":0,\"non\":0,\"ao\":0,\"quan\":0,\"toc\":0,\"caitrang\":0,\"face\":0}', '{\"data\":[],\"max\":20}', '[[11,0,1700367414969,402,1700367413969],[12,0,1700367418201,294,1700367416201],[13,0,1700367413750,86,1700367405750]]', '[11,12,13,-1,-1,-1,-1,-1,-1,-1]', '{\"coban\":{\"he\":4,\"level\":5,\"exp\":627,\"speed\":5},\"tiemnang\":{\"sucmanh\":0,\"phongthu\":0,\"theluc\":0,\"tinhthan\":0,\"nhanhnhen\":0},\"chiso\":{\"hp\":8,\"mp\":62,\"hpmax\":100,\"mpmax\":100,\"sat_thuong_phep\":0,\"sat_thuong_vat_ly\":15,\"_haki\":0,\"haki\":0,\"_sat_thuong_phep\":0,\"_sat_thuong_vat_ly\":0,\"khang_phep\":0,\"_khang_phep\":0,\"khang_vat_ly\":0,\"_khang_vat_ly\":0,\"_hpmax\":0,\"_mpmax\":0,\"hoi_chieu\":0,\"_sat_thuong_chi_mang\":0,\"_chi_mang\":0,\"_giam_sat_thuong_chi_mang\":0,\"_hoi_mau\":0,\"_hoi_mp\":0,\"_tru_mp\":0,\"_tru_hp\":0,\"sat_thuong_chi_mang\":0,\"chi_mang\":0,\"giam_sat_thuong_chi_mang\":0,\"hoi_mau\":0,\"hoi_mp\":0,\"tru_mp\":0,\"tru_hp\":0}}', '{\"x\":2824,\"y\":667,\"zone\":1,\"map\":1}', NULL, '{}'),
(5, 5, 1, 'lonnnnnn', '{}', '{\"beri\":0,\"ruby\":0}', NULL, '[]', '{\"dau\":\"iLvVMIbTpy\",\"ao\":\"dLwtvlNxiY\",\"quan\":\"dvuZmZtEqC\",\"toc\":\"vAiaeYISIt\",\"non\":\"axDwxOtydX\",\"lung\":\"axDwxOtydX\",\"tay\":\"CMnZavSAps\",\"id\":null}', '{\"vukhi\":0,\"daychuyen\":0,\"nhan\":0,\"non\":0,\"ao\":0,\"quan\":0,\"toc\":0,\"caitrang\":{},\"face\":0}', '{\"data\":[],\"max\":20}', '[[14,0,1700404213345,0,1700404212345],[15,0,1700404224690,72,1700404222690],[16,0,1700404232577,39,1700404224577]]', '[14,15,16,-1,-1,-1,-1,-1,-1,-1]', '{\"coban\":{\"he\":5,\"level\":2,\"exp\":0,\"speed\":5},\"tiemnang\":{\"sucmanh\":0,\"phongthu\":0,\"theluc\":0,\"tinhthan\":0,\"nhanhnhen\":0},\"chiso\":{\"hp\":32,\"mp\":2,\"hpmax\":100,\"mpmax\":100,\"sat_thuong_phep\":0,\"sat_thuong_vat_ly\":15,\"_haki\":0,\"haki\":0,\"_sat_thuong_phep\":0,\"_sat_thuong_vat_ly\":0,\"khang_phep\":0,\"_khang_phep\":0,\"khang_vat_ly\":0,\"_khang_vat_ly\":0,\"_hpmax\":0,\"_mpmax\":0,\"hoi_chieu\":0,\"_sat_thuong_chi_mang\":0,\"_chi_mang\":0,\"_giam_sat_thuong_chi_mang\":0,\"_hoi_mau\":0,\"_hoi_mp\":0,\"_tru_mp\":0,\"_tru_hp\":0,\"sat_thuong_chi_mang\":0,\"chi_mang\":0,\"giam_sat_thuong_chi_mang\":0,\"hoi_mau\":0,\"hoi_mp\":0,\"tru_mp\":0,\"tru_hp\":0}}', '{\"x\":1659,\"y\":501,\"zone\":1,\"map\":1}', NULL, '{}'),
(6, 5, 1, 'ggggggg', '{}', '{\"beri\":0,\"ruby\":0}', NULL, '[]', '{\"dau\":\"iLvVMIbTpy\",\"ao\":\"QTIydsakBM\",\"quan\":\"sFQjWHwTeb\",\"toc\":\"vAiaeYISIt\",\"non\":\"axDwxOtydX\",\"lung\":\"axDwxOtydX\",\"tay\":\"TKHxwNhWSU\",\"id\":null}', '{\"vukhi\":0,\"daychuyen\":0,\"nhan\":0,\"non\":0,\"ao\":0,\"quan\":0,\"toc\":0,\"caitrang\":{},\"face\":0}', '{\"data\":[],\"max\":20}', '[[11,0,0,0,0],[12,0,0,0,0],[13,0,0,0,0]]', '[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]', '{\"coban\":{\"he\":4,\"level\":1,\"exp\":0,\"speed\":5},\"tiemnang\":{\"sucmanh\":0,\"phongthu\":0,\"theluc\":0,\"tinhthan\":0,\"nhanhnhen\":0},\"chiso\":{\"hp\":79,\"mp\":100,\"hpmax\":100,\"mpmax\":100,\"sat_thuong_phep\":0,\"sat_thuong_vat_ly\":15,\"_haki\":0,\"haki\":0,\"_sat_thuong_phep\":0,\"_sat_thuong_vat_ly\":0,\"khang_phep\":0,\"_khang_phep\":0,\"khang_vat_ly\":0,\"_khang_vat_ly\":0,\"_hpmax\":0,\"_mpmax\":0,\"hoi_chieu\":0,\"_sat_thuong_chi_mang\":0,\"_chi_mang\":0,\"_giam_sat_thuong_chi_mang\":0,\"_hoi_mau\":0,\"_hoi_mp\":0,\"_tru_mp\":0,\"_tru_hp\":0,\"sat_thuong_chi_mang\":0,\"chi_mang\":0,\"giam_sat_thuong_chi_mang\":0,\"hoi_mau\":0,\"hoi_mp\":0,\"tru_mp\":0,\"tru_hp\":0}}', '{\"x\":1627,\"y\":603,\"zone\":1,\"map\":1}', NULL, '{}'),
(7, 3, 1, 'ctyttt', '{}', '{\"beri\":0,\"ruby\":0}', NULL, '[]', '{\"dau\":\"iLvVMIbTpy\",\"ao\":\"dLwtvlNxiY\",\"quan\":\"dvuZmZtEqC\",\"toc\":\"vAiaeYISIt\",\"non\":\"axDwxOtydX\",\"lung\":\"axDwxOtydX\",\"tay\":\"CMnZavSAps\",\"id\":null}', '{\"vukhi\":0,\"daychuyen\":0,\"nhan\":0,\"non\":0,\"ao\":0,\"quan\":0,\"toc\":0,\"caitrang\":{},\"face\":0}', '{\"data\":[],\"max\":20}', '[[14,0,0,0,0],[15,0,0,0,0],[16,0,0,0,0]]', '[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]', '{\"coban\":{\"he\":5,\"level\":1,\"exp\":0,\"speed\":5},\"tiemnang\":{\"sucmanh\":0,\"phongthu\":0,\"theluc\":0,\"tinhthan\":0,\"nhanhnhen\":0},\"chiso\":{\"hp\":100,\"mp\":100,\"hpmax\":100,\"mpmax\":100,\"sat_thuong_phep\":0,\"sat_thuong_vat_ly\":15,\"_haki\":0,\"haki\":0,\"_sat_thuong_phep\":0,\"_sat_thuong_vat_ly\":0,\"khang_phep\":0,\"_khang_phep\":0,\"khang_vat_ly\":0,\"_khang_vat_ly\":0,\"_hpmax\":0,\"_mpmax\":0,\"hoi_chieu\":0,\"_sat_thuong_chi_mang\":0,\"_chi_mang\":0,\"_giam_sat_thuong_chi_mang\":0,\"_hoi_mau\":0,\"_hoi_mp\":0,\"_tru_mp\":0,\"_tru_hp\":0,\"sat_thuong_chi_mang\":0,\"chi_mang\":0,\"giam_sat_thuong_chi_mang\":0,\"hoi_mau\":0,\"hoi_mp\":0,\"tru_mp\":0,\"tru_hp\":0}}', '{\"x\":998,\"y\":623,\"zone\":1,\"map\":1}', NULL, '{}'),
(8, 3, 1, 'fgtttttt', '{}', '{\"beri\":0,\"ruby\":0}', NULL, '[]', '{\"dau\":\"iLvVMIbTpy\",\"ao\":\"NjeYgxYqhI\",\"quan\":\"yEIqrdJLIw\",\"toc\":\"vAiaeYISIt\",\"non\":\"axDwxOtydX\",\"lung\":\"axDwxOtydX\",\"tay\":\"KaVgueHoaP\",\"id\":null}', '{\"vukhi\":0,\"daychuyen\":0,\"nhan\":0,\"non\":0,\"ao\":0,\"quan\":0,\"toc\":0,\"caitrang\":{},\"face\":0}', '{\"data\":[],\"max\":20}', '[[4,0,0,0,0],[5,0,0,0,0],[6,0,0,0,0]]', '[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]', '{\"coban\":{\"he\":2,\"level\":1,\"exp\":0,\"speed\":5},\"tiemnang\":{\"sucmanh\":0,\"phongthu\":0,\"theluc\":0,\"tinhthan\":0,\"nhanhnhen\":0},\"chiso\":{\"hp\":61,\"mp\":100,\"hpmax\":100,\"mpmax\":100,\"sat_thuong_phep\":0,\"sat_thuong_vat_ly\":15,\"_haki\":0,\"haki\":0,\"_sat_thuong_phep\":0,\"_sat_thuong_vat_ly\":0,\"khang_phep\":0,\"_khang_phep\":0,\"khang_vat_ly\":0,\"_khang_vat_ly\":0,\"_hpmax\":0,\"_mpmax\":0,\"hoi_chieu\":0,\"_sat_thuong_chi_mang\":0,\"_chi_mang\":0,\"_giam_sat_thuong_chi_mang\":0,\"_hoi_mau\":0,\"_hoi_mp\":0,\"_tru_mp\":0,\"_tru_hp\":0,\"sat_thuong_chi_mang\":0,\"chi_mang\":0,\"giam_sat_thuong_chi_mang\":0,\"hoi_mau\":0,\"hoi_mp\":0,\"tru_mp\":0,\"tru_hp\":0}}', '{\"x\":1079,\"y\":532,\"zone\":1,\"map\":1}', NULL, '{}'),
(9, 6, 1, 'xatyuvip', '{}', '{\"beri\":0,\"ruby\":0}', NULL, '[]', '{\"dau\":\"iLvVMIbTpy\",\"ao\":\"kFFosytneB\",\"quan\":\"QSHGPlNDTK\",\"toc\":\"vAiaeYISIt\",\"non\":\"vqFwgeDhai\",\"lung\":\"axDwxOtydX\",\"tay\":\"axDwxOtydX\",\"id\":null}', '{\"vukhi\":0,\"daychuyen\":0,\"nhan\":0,\"non\":0,\"ao\":0,\"quan\":0,\"toc\":0,\"caitrang\":{},\"face\":0}', '{\"data\":[],\"max\":20}', '[[1,0,0,0,0],[2,0,0,0,0],[3,0,0,0,0],[200,0,0,0,0],[300,0,0,0,0]]', '[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]', '{\"coban\":{\"he\":1,\"level\":1,\"exp\":0,\"speed\":5},\"tiemnang\":{\"sucmanh\":0,\"phongthu\":0,\"theluc\":0,\"tinhthan\":0,\"nhanhnhen\":0},\"chiso\":{\"hp\":100,\"mp\":100,\"hpmax\":110,\"mpmax\":110,\"sat_thuong_phep\":0,\"sat_thuong_vat_ly\":15,\"_haki\":0,\"haki\":0,\"_sat_thuong_phep\":0,\"_sat_thuong_vat_ly\":0,\"khang_phep\":0,\"_khang_phep\":0,\"khang_vat_ly\":0,\"_khang_vat_ly\":0,\"_hpmax\":10,\"_mpmax\":10,\"hoi_chieu\":0,\"_sat_thuong_chi_mang\":0,\"_chi_mang\":0,\"_giam_sat_thuong_chi_mang\":0,\"_hoi_mau\":0,\"_hoi_mp\":0,\"_tru_mp\":0,\"_tru_hp\":0,\"sat_thuong_chi_mang\":0,\"chi_mang\":0,\"giam_sat_thuong_chi_mang\":0,\"hoi_mau\":0,\"hoi_mp\":0,\"tru_mp\":0,\"tru_hp\":0}}', '{\"x\":2148,\"y\":695,\"zone\":1,\"map\":1}', NULL, '{}');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nick`
--

CREATE TABLE `nick` (
  `id` int(11) NOT NULL,
  `username` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `password` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `token` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `veri` int(11) DEFAULT '0',
  `uid` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nick`
--

INSERT INTO `nick` (`id`, `username`, `password`, `token`, `veri`, `uid`) VALUES
(1, 'admin', 'ef372370cb87cffc3ab03cff492ba8f6', 'iK3vS3rMWvmImT4B8nsp2xdUaGqakJ', 1, 1),
(2, 'daubep', 'ef372370cb87cffc3ab03cff492ba8f6', '9po0QAnMbWrdPTHpQSyvLJkL97nmgk', 1, 2),
(3, 'admin2', 'ef372370cb87cffc3ab03cff492ba8f6', 'Xs022Gu0JM4IkfpVvZlRAPKrLiiRIx', 1, 8),
(4, 'admin3', 'ef372370cb87cffc3ab03cff492ba8f6', NULL, 0, 0),
(5, 'test01', 'ef372370cb87cffc3ab03cff492ba8f6', NULL, 0, 6),
(6, 'ducnghia', 'ef372370cb87cffc3ab03cff492ba8f6', NULL, 0, 9);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `banghoi`
--
ALTER TABLE `banghoi`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`,`created_date`) USING BTREE,
  ADD KEY `uid` (`uid`);

--
-- Chỉ mục cho bảng `nhanvat`
--
ALTER TABLE `nhanvat`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `nick`
--
ALTER TABLE `nick`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `banghoi`
--
ALTER TABLE `banghoi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `log`
--
ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `nhanvat`
--
ALTER TABLE `nhanvat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `nick`
--
ALTER TABLE `nick`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
