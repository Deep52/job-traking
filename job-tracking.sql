PGDMP     5                    z           job-tracking    14.1    14.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24850    job-tracking    DATABASE     s   CREATE DATABASE "job-tracking" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United Kingdom.1252';
    DROP DATABASE "job-tracking";
                postgres    false            �            1259    41267    addjob    TABLE     �  CREATE TABLE public.addjob (
    id integer NOT NULL,
    company_name character varying(250),
    job_tittle character varying(250),
    qualified character varying(50),
    failed_in character varying(150),
    resume_name character varying(200),
    feedback character varying(2000),
    response_feedback character varying(2000),
    user_id integer NOT NULL,
    response "char" NOT NULL,
    create_date character varying(100) NOT NULL,
    prof_name character varying(150)
);
    DROP TABLE public.addjob;
       public         heap    postgres    false            �            1259    41266    addjob_id_seq    SEQUENCE     �   ALTER TABLE public.addjob ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.addjob_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    216            �            1259    33071    course    TABLE     �   CREATE TABLE public.course (
    id integer NOT NULL,
    course_full_name character varying(300),
    couse character varying(200),
    dept_id integer NOT NULL,
    level character varying(200) NOT NULL
);
    DROP TABLE public.course;
       public         heap    postgres    false            �            1259    33070    course_id_seq    SEQUENCE     �   ALTER TABLE public.course ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.course_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    214            �            1259    33063 
   department    TABLE     �   CREATE TABLE public.department (
    id integer NOT NULL,
    dept_full_name character varying(200) NOT NULL,
    dept character varying(200) NOT NULL,
    s_date character varying(200)
);
    DROP TABLE public.department;
       public         heap    postgres    false            �            1259    33062    department_id_seq    SEQUENCE     �   ALTER TABLE public.department ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.department_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    212            �            1259    33043    login    TABLE     �  CREATE TABLE public.login (
    id integer NOT NULL,
    fname character varying(250),
    lname character varying(250),
    email character varying(250),
    password character varying(400),
    type character varying(200),
    salt character varying(200),
    twofa boolean,
    access integer NOT NULL,
    start_date character varying(200),
    typebyadmin "char",
    department character varying(250),
    course character varying(250),
    admintype character varying(15)
);
    DROP TABLE public.login;
       public         heap    postgres    false            �            1259    33042    login_id_seq    SEQUENCE     �   ALTER TABLE public.login ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.login_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    210            �            1259    49441    reply_response    TABLE     �  CREATE TABLE public.reply_response (
    id integer NOT NULL,
    reply_by_student character varying(1000),
    reply_by_professor character varying(1000),
    user_id integer NOT NULL,
    job_id integer NOT NULL,
    user_name character varying(200),
    prof_name character varying(200),
    date character varying(100),
    time_r character varying(100),
    count1 integer,
    count2 integer
);
 "   DROP TABLE public.reply_response;
       public         heap    postgres    false            �            1259    49440    reply_response_id_seq    SEQUENCE     �   ALTER TABLE public.reply_response ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reply_response_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    218                      0    41267    addjob 
   TABLE DATA           �   COPY public.addjob (id, company_name, job_tittle, qualified, failed_in, resume_name, feedback, response_feedback, user_id, response, create_date, prof_name) FROM stdin;
    public          postgres    false    216   �#       
          0    33071    course 
   TABLE DATA           M   COPY public.course (id, course_full_name, couse, dept_id, level) FROM stdin;
    public          postgres    false    214   �)                 0    33063 
   department 
   TABLE DATA           F   COPY public.department (id, dept_full_name, dept, s_date) FROM stdin;
    public          postgres    false    212   *                 0    33043    login 
   TABLE DATA           �   COPY public.login (id, fname, lname, email, password, type, salt, twofa, access, start_date, typebyadmin, department, course, admintype) FROM stdin;
    public          postgres    false    210   �*                 0    49441    reply_response 
   TABLE DATA           �   COPY public.reply_response (id, reply_by_student, reply_by_professor, user_id, job_id, user_name, prof_name, date, time_r, count1, count2) FROM stdin;
    public          postgres    false    218   Y-                  0    0    addjob_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.addjob_id_seq', 88, true);
          public          postgres    false    215                       0    0    course_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.course_id_seq', 9, true);
          public          postgres    false    213                       0    0    department_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.department_id_seq', 8, true);
          public          postgres    false    211                       0    0    login_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.login_id_seq', 27, true);
          public          postgres    false    209                       0    0    reply_response_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.reply_response_id_seq', 60, true);
          public          postgres    false    217            w           2606    41271    addjob addjob_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.addjob
    ADD CONSTRAINT addjob_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.addjob DROP CONSTRAINT addjob_pkey;
       public            postgres    false    216            u           2606    33077    course course_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.course DROP CONSTRAINT course_pkey;
       public            postgres    false    214            s           2606    33069    department department_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.department DROP CONSTRAINT department_pkey;
       public            postgres    false    212            q           2606    33047    login login_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.login DROP CONSTRAINT login_pkey;
       public            postgres    false    210            y           2606    49445 "   reply_response reply_response_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.reply_response
    ADD CONSTRAINT reply_response_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.reply_response DROP CONSTRAINT reply_response_pkey;
       public            postgres    false    218               �  x���[o�6���_A`/ۃK�/yܲ�(��-P��ě��HIV��wHIq,��%. [�M<�s(�4�Bj��&��/пL�CT!�v�Ni]�E>���#����{�{��?[lf�����(j�
slPo�&f��B�(��"f�����\�B�PL�;ɢ��Be�f9������[�(3�5B����\I���
�Q4����X��b�9���1jBn}U\���������q�)�̴����D6^.��Մ �р%�c(&��Q�4��N+����&���a3v��v�VgɩD\K��竁k�_�!�CH�p*u��ա�\J�:��&�O_��<9r� �5 kF]�T$z`��㈤����b�KŸ�w�8�8��\刂?������5���	5���`�]5�_�2��E���^^��j9�>�
�қy������ Gw����ll��"��U�2r�
�����Bz0�o�P�B����Ф��JZhb݁�diZ����zeJ��u�7RQN�ʄ�6w}��Q�7,�v�(��y�V ��0m�`��S�G����>���\VY:I�����ښ�G&>��ѳ�3�*�U�4�`�c%~W÷��
�{�S�[�[h�Då�R1��Y\1
^"i%���h�����O������c�h���Y��&����b�S�	v��%&[�5TQ������)�LqTd%�A�9���F~�>��X�=����{%[����w"�L��6�
6�@j{�<�ӷ}x�c}� ��i���k�"0I�m�	mΓ�.ӂ��^wч�&��Fb���[hb��8A���ó�~���{C�Q���� E��@���� �`Y����
&� ��1%�����)kXZ���əݚ�L�]���1��y[����.!�{�6����}��\v����a�aj2��1�{��FY")�eL&��D9�4�&]a�yoB���[M+I�Dc^(��, �.|ё��Q��|n�ǘd8-��T�7���v�-g�H�n�+�@%8mƠ!�Œ�X,7A�mwQ�T�im���l}*eß0z�m#`t�c|�!���%Y��9H�v�o���ij��v���0eC�;�M�=�̺���'��Y���A���i%*`t|�����먆�=`��0���r`���� ��\��Ow?��q�{�r�T���:���3���qᘎ�P"Q�2I�'�E��'����,P�sl��#�B|�����H�����G!p��:8�+8�3N`��h*��və~�B���Q���1!l���9������7�,�-�{��(IkQ׉3��L��u21z���G?��؞�D	H{%�,�X��b����"�zdЛN1	Y�B׼8sQ�ȋyxu���u��K�]'�Ӊ䢮t������7��O�˻���A.N��6<�vs:f��85_��jǏ�Qh�}"b�%����������]s      
   z   x�3��vVpL)K�KNUp��-(-I-RN�L
@$��99ܹ��\�j`J��<�ĒDi���oq��Siqf^jq��ob^bzjnj^	Dܗ��ʒ3�KLI)�ϩTH��
8-@�1z\\\  [3�         g   x�3�t��-(-I-RN�L�KN�t��4202�50�50�2�t*-��K-.��urD�Xrsz�&�d�t*pz��p%F&\�I��9��
 T�B���+F��� ry          �  x����nG��ͧ���^��f�ؑ!�W_���A�Rt�<}z�ġ��,�����pϧavO����d������aǏ�z��B���)è�#Ȩ��V+�]AcCn�<�1���bh�f�����iL5��}�#`�HPÇ�F��H�@a^v�˳�n��h{���f�9l����W�|9��GC8�uyu1^��/O�wT��K�mz�J�6�K�P�i�>T�d��6�6�5ɕ,l�/����[��j+��9uU1Jg��|���F
��������9ܝ��ߋ�;���o��&�G�o��Jɐ���H1:yn9RC1b��H�k�y&�;�>����Г�Ț:LP��}�-w߻����ҿ۾�ٌO<�o^�f�%�����?��?�������;J�̤,	��4��ڌ�͐�D�6 �V��TL���t���J�GtJY�jE7 ʲ����[���E���"j����n!��O���C�7��'�m�c��Q�HM�KDNSe��d�=ѐ�����ܐK��Z�)�2p��s��r���?�Â��|>��ox����r�rS1��ܳh��-)�&	 �Vr�$���lsB�4�L�Z�U����\�q��(s+=�����?��� ���C�ݩw���%k�� �4���V�QH�9s���p19ʕ�4J�>!2��S�2��8q�V���e/K��X�V���ԉ�         F  x���ˎ�0���)�T�-o����*�� �1��!�A!	Ч�o'�3�0f�Y�"���r|L8*7��<#J'��1�zhT�f�.�Ւ�涅d���� ]Jg�XZ]�
0&Ir4:|)�d�K�#�B�et���\�<�r�e�Js.)��m*]?и��3O3��Mr�BHhwf��,�uCզ�6ydb%i�e��е�t2^�[�U@���_K�".�X��6��D"	T�0("
�ߜ��j����hXZ�V Q���ADF��5�w��J�)����,{��>��a:�$n��з����ה�|��� GO����m��qg��+Ɓ⨠�K�N6����
�!������jU�����{� A q`�bҀk�7�F��V��0���=�F�)��[���M9���FR,3�H	�g\�r۔��t���CN��Avp�Wx�N��T	o�$X��m�2����`L��o�����O	�����ߞ`���v�zNX{����h: 	��[��:mu:��)B��a�]���|_!N?�q �B;l�h�k7�����s�r���9qc晒����#I�y�0T>/����v���w< N�����.�׊�s�;]~�mF%�T*}��� �Po��O����Z�F_��i.���0�<���}�$�Q���k;t�kwjU��;�l�[gB>�ɼ�1b*�3�\�/�=��94�5����	`�$���R^Lپ�{�
̆��=��ZWS4���E�*N�����*�$s� �/Lx��ʚ���vs�-ރ��!�����|�\���)���D'���'%��Dç7Ѕ7��_>-�_$@��     