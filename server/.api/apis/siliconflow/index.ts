import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'siliconflow/1.0.0 (api/6.1.1)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Creates a model response for the given chat conversation.
   *
   * @summary Chat Completions
   * @throws FetchError<400, types.ChatCompletionsResponse400> BadRequest
   * @throws FetchError<401, types.ChatCompletionsResponse401> Unauthorized
   * @throws FetchError<404, types.ChatCompletionsResponse404> NotFound
   * @throws FetchError<429, types.ChatCompletionsResponse429> RateLimit
   * @throws FetchError<503, types.ChatCompletionsResponse503> Overloaded
   * @throws FetchError<504, types.ChatCompletionsResponse504> Timeout
   */
  chatCompletions(body: types.ChatCompletionsBodyParam): Promise<FetchResponse<200, types.ChatCompletionsResponse200>> {
    return this.core.fetch('/v1/chat/completions', 'post', body);
  }

  /**
   * Creates an image response for the given prompt.
   *
   * @summary Stable Diffusion XL
   * @throws FetchError<400, types.StabilityaiStableDiffusionXlBase10TextToImageResponse400> BadRequest
   * @throws FetchError<401, types.StabilityaiStableDiffusionXlBase10TextToImageResponse401> Unauthorized
   * @throws FetchError<404, types.StabilityaiStableDiffusionXlBase10TextToImageResponse404> NotFound
   * @throws FetchError<429, types.StabilityaiStableDiffusionXlBase10TextToImageResponse429> RateLimit
   * @throws FetchError<503, types.StabilityaiStableDiffusionXlBase10TextToImageResponse503> Overloaded
   * @throws FetchError<504, types.StabilityaiStableDiffusionXlBase10TextToImageResponse504> Timeout
   */
  stabilityaiStableDiffusionXlBase10_textToImage(body: types.StabilityaiStableDiffusionXlBase10TextToImageBodyParam): Promise<FetchResponse<200, types.StabilityaiStableDiffusionXlBase10TextToImageResponse200>> {
    return this.core.fetch('/v1/stabilityai/stable-diffusion-xl-base-1.0/text-to-image', 'post', body);
  }

  /**
   * Creates an image response for the given prompt.
   *
   * @summary Stable Diffusion 2.1
   * @throws FetchError<400, types.StabilityaiStableDiffusion21TextToImageResponse400> BadRequest
   * @throws FetchError<401, types.StabilityaiStableDiffusion21TextToImageResponse401> Unauthorized
   * @throws FetchError<404, types.StabilityaiStableDiffusion21TextToImageResponse404> NotFound
   * @throws FetchError<429, types.StabilityaiStableDiffusion21TextToImageResponse429> RateLimit
   * @throws FetchError<503, types.StabilityaiStableDiffusion21TextToImageResponse503> Overloaded
   * @throws FetchError<504, types.StabilityaiStableDiffusion21TextToImageResponse504> Timeout
   */
  stabilityaiStableDiffusion21_textToImage(body: types.StabilityaiStableDiffusion21TextToImageBodyParam): Promise<FetchResponse<200, types.StabilityaiStableDiffusion21TextToImageResponse200>> {
    return this.core.fetch('/v1/stabilityai/stable-diffusion-2-1/text-to-image', 'post', body);
  }

  /**
   * Creates an image response for the given prompt.
   *
   * @summary Stable Diffusion Turbo
   * @throws FetchError<400, types.StabilityaiSdTurboTextToImageResponse400> BadRequest
   * @throws FetchError<401, types.StabilityaiSdTurboTextToImageResponse401> Unauthorized
   * @throws FetchError<404, types.StabilityaiSdTurboTextToImageResponse404> NotFound
   * @throws FetchError<429, types.StabilityaiSdTurboTextToImageResponse429> RateLimit
   * @throws FetchError<503, types.StabilityaiSdTurboTextToImageResponse503> Overloaded
   * @throws FetchError<504, types.StabilityaiSdTurboTextToImageResponse504> Timeout
   */
  stabilityaiSdTurbo_textToImage(body: types.StabilityaiSdTurboTextToImageBodyParam): Promise<FetchResponse<200, types.StabilityaiSdTurboTextToImageResponse200>> {
    return this.core.fetch('/v1/stabilityai/sd-turbo/text-to-image', 'post', body);
  }

  /**
   * Creates an image response for the given prompt.
   *
   * @summary Stable Diffusion XL Turbo
   * @throws FetchError<400, types.StabilityaiSdxlTurboTextToImageResponse400> BadRequest
   * @throws FetchError<401, types.StabilityaiSdxlTurboTextToImageResponse401> Unauthorized
   * @throws FetchError<404, types.StabilityaiSdxlTurboTextToImageResponse404> NotFound
   * @throws FetchError<429, types.StabilityaiSdxlTurboTextToImageResponse429> RateLimit
   * @throws FetchError<503, types.StabilityaiSdxlTurboTextToImageResponse503> Overloaded
   * @throws FetchError<504, types.StabilityaiSdxlTurboTextToImageResponse504> Timeout
   */
  stabilityaiSdxlTurbo_textToImage(body: types.StabilityaiSdxlTurboTextToImageBodyParam): Promise<FetchResponse<200, types.StabilityaiSdxlTurboTextToImageResponse200>> {
    return this.core.fetch('/v1/stabilityai/sdxl-turbo/text-to-image', 'post', body);
  }

  /**
   * Creates an image response for the given prompt.
   *
   * @summary Stable Diffusion XL Lighting
   * @throws FetchError<400, types.ByteDanceSdxlLightningTextToImageResponse400> BadRequest
   * @throws FetchError<401, types.ByteDanceSdxlLightningTextToImageResponse401> Unauthorized
   * @throws FetchError<404, types.ByteDanceSdxlLightningTextToImageResponse404> NotFound
   * @throws FetchError<429, types.ByteDanceSdxlLightningTextToImageResponse429> RateLimit
   * @throws FetchError<503, types.ByteDanceSdxlLightningTextToImageResponse503> Overloaded
   * @throws FetchError<504, types.ByteDanceSdxlLightningTextToImageResponse504> Timeout
   */
  byteDanceSDXLLightning_textToImage(body: types.ByteDanceSdxlLightningTextToImageBodyParam): Promise<FetchResponse<200, types.ByteDanceSdxlLightningTextToImageResponse200>> {
    return this.core.fetch('/v1/ByteDance/SDXL-Lightning/text-to-image', 'post', body);
  }

  /**
   * Creates an image response for the given prompt.
   *
   * @summary RealVis4Lightning
   * @throws FetchError<400, types.SG161222RealVis4LightningResponse400> BadRequest
   * @throws FetchError<401, types.SG161222RealVis4LightningResponse401> Unauthorized
   * @throws FetchError<404, types.SG161222RealVis4LightningResponse404> NotFound
   * @throws FetchError<429, types.SG161222RealVis4LightningResponse429> RateLimit
   * @throws FetchError<503, types.SG161222RealVis4LightningResponse503> Overloaded
   * @throws FetchError<504, types.SG161222RealVis4LightningResponse504> Timeout
   */
  sG161222RealVis4Lightning(body: types.SG161222RealVis4LightningBodyParam): Promise<FetchResponse<200, types.SG161222RealVis4LightningResponse200>> {
    return this.core.fetch('/v1/SG161222/RealVis4Lightning/text-to-image', 'post', body);
  }

  /**
   * Given a prompt and/or an input picture, the model will generate a new picture.
   *
   * @summary Stable Diffusion XL
   * @throws FetchError<400, types.StabilityaiStableDiffusionXlBase10ImageToImageResponse400> BadRequest
   * @throws FetchError<401, types.StabilityaiStableDiffusionXlBase10ImageToImageResponse401> Unauthorized
   * @throws FetchError<404, types.StabilityaiStableDiffusionXlBase10ImageToImageResponse404> NotFound
   * @throws FetchError<429, types.StabilityaiStableDiffusionXlBase10ImageToImageResponse429> RateLimit
   * @throws FetchError<503, types.StabilityaiStableDiffusionXlBase10ImageToImageResponse503> Overloaded
   * @throws FetchError<504, types.StabilityaiStableDiffusionXlBase10ImageToImageResponse504> Timeout
   */
  stabilityaiStableDiffusionXlBase10_imageToImage(body: types.StabilityaiStableDiffusionXlBase10ImageToImageBodyParam): Promise<FetchResponse<200, types.StabilityaiStableDiffusionXlBase10ImageToImageResponse200>> {
    return this.core.fetch('/v1/stabilityai/stable-diffusion-xl-base-1.0/image-to-image', 'post', body);
  }

  /**
   * Given a prompt and/or an input picture, the model will generate a new picture.
   *
   * @summary Stable Diffusion 2.1
   * @throws FetchError<400, types.StabilityaiStableDiffusion21ImageToImageResponse400> BadRequest
   * @throws FetchError<401, types.StabilityaiStableDiffusion21ImageToImageResponse401> Unauthorized
   * @throws FetchError<404, types.StabilityaiStableDiffusion21ImageToImageResponse404> NotFound
   * @throws FetchError<429, types.StabilityaiStableDiffusion21ImageToImageResponse429> RateLimit
   * @throws FetchError<503, types.StabilityaiStableDiffusion21ImageToImageResponse503> Overloaded
   * @throws FetchError<504, types.StabilityaiStableDiffusion21ImageToImageResponse504> Timeout
   */
  stabilityaiStableDiffusion21_imageToImage(body: types.StabilityaiStableDiffusion21ImageToImageBodyParam): Promise<FetchResponse<200, types.StabilityaiStableDiffusion21ImageToImageResponse200>> {
    return this.core.fetch('/v1/stabilityai/stable-diffusion-2-1/image-to-image', 'post', body);
  }

  /**
   * Given a prompt and/or an input picture, the model will generate a new picture.
   *
   * @summary Stable Diffusion XL Lighting
   * @throws FetchError<400, types.ByteDanceSdxlLightningImageToImageResponse400> BadRequest
   * @throws FetchError<401, types.ByteDanceSdxlLightningImageToImageResponse401> Unauthorized
   * @throws FetchError<404, types.ByteDanceSdxlLightningImageToImageResponse404> NotFound
   * @throws FetchError<429, types.ByteDanceSdxlLightningImageToImageResponse429> RateLimit
   * @throws FetchError<503, types.ByteDanceSdxlLightningImageToImageResponse503> Overloaded
   * @throws FetchError<504, types.ByteDanceSdxlLightningImageToImageResponse504> Timeout
   */
  byteDanceSDXLLightning_imageToImage(body: types.ByteDanceSdxlLightningImageToImageBodyParam): Promise<FetchResponse<200, types.ByteDanceSdxlLightningImageToImageResponse200>> {
    return this.core.fetch('/v1/ByteDance/SDXL-Lightning/image-to-image', 'post', body);
  }

  /**
   * Given a prompt and/or an input picture, the model will generate a new picture.
   *
   * @summary InstantID
   * @throws FetchError<400, types.InstantIdResponse400> BadRequest
   * @throws FetchError<401, types.InstantIdResponse401> Unauthorized
   * @throws FetchError<404, types.InstantIdResponse404> NotFound
   * @throws FetchError<429, types.InstantIdResponse429> RateLimit
   * @throws FetchError<503, types.InstantIdResponse503> Overloaded
   * @throws FetchError<504, types.InstantIdResponse504> Timeout
   */
  instantID(body: types.InstantIdBodyParam): Promise<FetchResponse<200, types.InstantIdResponse200>> {
    return this.core.fetch('/v1/InstantX/InstantID/image-to-image', 'post', body);
  }

  /**
   * Given a prompt and/or an input picture, the model will generate a new picture.
   *
   * @summary PhotoMaker
   * @throws FetchError<400, types.PhotoMakerResponse400> BadRequest
   * @throws FetchError<401, types.PhotoMakerResponse401> Unauthorized
   * @throws FetchError<404, types.PhotoMakerResponse404> NotFound
   * @throws FetchError<429, types.PhotoMakerResponse429> RateLimit
   * @throws FetchError<503, types.PhotoMakerResponse503> Overloaded
   * @throws FetchError<504, types.PhotoMakerResponse504> Timeout
   */
  photoMaker(body: types.PhotoMakerBodyParam): Promise<FetchResponse<200, types.PhotoMakerResponse200>> {
    return this.core.fetch('/v1/TencentARC/PhotoMaker/image-to-image', 'post', body);
  }

  /**
   * Given a prompt and/or an input picture, the model will generate a new picture.
   *
   * @summary DecorationDesign
   * @throws FetchError<400, types.DecorationDesignResponse400> BadRequest
   * @throws FetchError<401, types.DecorationDesignResponse401> Unauthorized
   * @throws FetchError<404, types.DecorationDesignResponse404> NotFound
   * @throws FetchError<429, types.DecorationDesignResponse429> RateLimit
   * @throws FetchError<503, types.DecorationDesignResponse503> Overloaded
   * @throws FetchError<504, types.DecorationDesignResponse504> Timeout
   */
  decorationDesign(body: types.DecorationDesignBodyParam): Promise<FetchResponse<200, types.DecorationDesignResponse200>> {
    return this.core.fetch('/v1/BeijingUltimatech/DecorationDesign/image-to-image', 'post', body);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { ByteDanceSdxlLightningImageToImageBodyParam, ByteDanceSdxlLightningImageToImageResponse200, ByteDanceSdxlLightningImageToImageResponse400, ByteDanceSdxlLightningImageToImageResponse401, ByteDanceSdxlLightningImageToImageResponse404, ByteDanceSdxlLightningImageToImageResponse429, ByteDanceSdxlLightningImageToImageResponse503, ByteDanceSdxlLightningImageToImageResponse504, ByteDanceSdxlLightningTextToImageBodyParam, ByteDanceSdxlLightningTextToImageResponse200, ByteDanceSdxlLightningTextToImageResponse400, ByteDanceSdxlLightningTextToImageResponse401, ByteDanceSdxlLightningTextToImageResponse404, ByteDanceSdxlLightningTextToImageResponse429, ByteDanceSdxlLightningTextToImageResponse503, ByteDanceSdxlLightningTextToImageResponse504, ChatCompletionsBodyParam, ChatCompletionsResponse200, ChatCompletionsResponse400, ChatCompletionsResponse401, ChatCompletionsResponse404, ChatCompletionsResponse429, ChatCompletionsResponse503, ChatCompletionsResponse504, DecorationDesignBodyParam, DecorationDesignResponse200, DecorationDesignResponse400, DecorationDesignResponse401, DecorationDesignResponse404, DecorationDesignResponse429, DecorationDesignResponse503, DecorationDesignResponse504, InstantIdBodyParam, InstantIdResponse200, InstantIdResponse400, InstantIdResponse401, InstantIdResponse404, InstantIdResponse429, InstantIdResponse503, InstantIdResponse504, PhotoMakerBodyParam, PhotoMakerResponse200, PhotoMakerResponse400, PhotoMakerResponse401, PhotoMakerResponse404, PhotoMakerResponse429, PhotoMakerResponse503, PhotoMakerResponse504, SG161222RealVis4LightningBodyParam, SG161222RealVis4LightningResponse200, SG161222RealVis4LightningResponse400, SG161222RealVis4LightningResponse401, SG161222RealVis4LightningResponse404, SG161222RealVis4LightningResponse429, SG161222RealVis4LightningResponse503, SG161222RealVis4LightningResponse504, StabilityaiSdTurboTextToImageBodyParam, StabilityaiSdTurboTextToImageResponse200, StabilityaiSdTurboTextToImageResponse400, StabilityaiSdTurboTextToImageResponse401, StabilityaiSdTurboTextToImageResponse404, StabilityaiSdTurboTextToImageResponse429, StabilityaiSdTurboTextToImageResponse503, StabilityaiSdTurboTextToImageResponse504, StabilityaiSdxlTurboTextToImageBodyParam, StabilityaiSdxlTurboTextToImageResponse200, StabilityaiSdxlTurboTextToImageResponse400, StabilityaiSdxlTurboTextToImageResponse401, StabilityaiSdxlTurboTextToImageResponse404, StabilityaiSdxlTurboTextToImageResponse429, StabilityaiSdxlTurboTextToImageResponse503, StabilityaiSdxlTurboTextToImageResponse504, StabilityaiStableDiffusion21ImageToImageBodyParam, StabilityaiStableDiffusion21ImageToImageResponse200, StabilityaiStableDiffusion21ImageToImageResponse400, StabilityaiStableDiffusion21ImageToImageResponse401, StabilityaiStableDiffusion21ImageToImageResponse404, StabilityaiStableDiffusion21ImageToImageResponse429, StabilityaiStableDiffusion21ImageToImageResponse503, StabilityaiStableDiffusion21ImageToImageResponse504, StabilityaiStableDiffusion21TextToImageBodyParam, StabilityaiStableDiffusion21TextToImageResponse200, StabilityaiStableDiffusion21TextToImageResponse400, StabilityaiStableDiffusion21TextToImageResponse401, StabilityaiStableDiffusion21TextToImageResponse404, StabilityaiStableDiffusion21TextToImageResponse429, StabilityaiStableDiffusion21TextToImageResponse503, StabilityaiStableDiffusion21TextToImageResponse504, StabilityaiStableDiffusionXlBase10ImageToImageBodyParam, StabilityaiStableDiffusionXlBase10ImageToImageResponse200, StabilityaiStableDiffusionXlBase10ImageToImageResponse400, StabilityaiStableDiffusionXlBase10ImageToImageResponse401, StabilityaiStableDiffusionXlBase10ImageToImageResponse404, StabilityaiStableDiffusionXlBase10ImageToImageResponse429, StabilityaiStableDiffusionXlBase10ImageToImageResponse503, StabilityaiStableDiffusionXlBase10ImageToImageResponse504, StabilityaiStableDiffusionXlBase10TextToImageBodyParam, StabilityaiStableDiffusionXlBase10TextToImageResponse200, StabilityaiStableDiffusionXlBase10TextToImageResponse400, StabilityaiStableDiffusionXlBase10TextToImageResponse401, StabilityaiStableDiffusionXlBase10TextToImageResponse404, StabilityaiStableDiffusionXlBase10TextToImageResponse429, StabilityaiStableDiffusionXlBase10TextToImageResponse503, StabilityaiStableDiffusionXlBase10TextToImageResponse504 } from './types';
