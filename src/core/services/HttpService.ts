import EncryptionService from "./EncryptionService";
import PasswordService from "./PasswordService";
import HttpRequestValidationService from "./ValidationService";
import WebTokenService from "./WebtokenService";

export default class HttpService {
    public readonly requestValidation = new HttpRequestValidationService();
    public readonly passwordService = new PasswordService();
    public readonly webtokenService = new WebTokenService();
    public readonly encryptionService = new EncryptionService();
}