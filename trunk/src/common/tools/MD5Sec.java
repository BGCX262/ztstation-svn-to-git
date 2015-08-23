package common.tools;

import java.security.*;
import java.security.spec.*;

public class MD5Sec {
	public final static String MD5(String s) {
		char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
				'a', 'b', 'c', 'd', 'e', 'f' };
		try {
			byte[] strTemp = s.getBytes();
			MessageDigest mdTemp = MessageDigest.getInstance("MD5");
			mdTemp.update(strTemp);
			byte[] md = mdTemp.digest();
			int j = md.length;
			char str[] = new char[j * 2];
			int k = 0;
			for (int i = 0; i < j; i++) {
				byte byte0 = md[i];
				str[k++] = hexDigits[byte0 >>> 4 & 0xf];
				str[k++] = hexDigits[byte0 & 0xf];
			}
			return new String(str);
		} catch (Exception e) {
			return null;
		}
	}

	public static void main(String[] args) {
		// MD5_Test aa = new MD5_Test();
		System.out.println("xtkwfn "+MD5Sec.MD5("xtkwfn"));
		System.out.println("admin "+ MD5Sec.MD5("admin"));
		System.out.println("scb "+ MD5Sec.MD5("scb"));
		System.out.println("ck "+ MD5Sec.MD5("ck"));
		System.out.println("gcb "+ MD5Sec.MD5("gcb"));
		System.out.println("sc "+ MD5Sec.MD5("sc"));
		System.out.println("wang "+ MD5Sec.MD5("wang"));
		
		// 92AAF389BACFDDFC320E424109BAE45F
	}

}